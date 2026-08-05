import 'dotenv/config';
import bcrypt from 'bcrypt';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ContentStatus, Role } from '../generated/prisma/client.js';
import { prisma } from './lib/prisma.js';

const app = express();
const port = Number(process.env.PORT ?? 4000);
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('JWT_SECRET is not set. Add it to .env.');
const secret: string = jwtSecret;

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? true }));
app.use(express.json());

type AuthRequest = Request & { user?: { id: string; role: Role } };
const signToken = (id: string, role: Role) => jwt.sign({ sub: id, role }, secret, { expiresIn: '7d' });
const toDestination = (d: any) => ({ ...d, dailyCost: Number(d.dailyCost), rating: Number(d.rating), attractions: d.attractions?.map((a: any) => ({ ...a, entryFee: Number(a.entryFee) })) });

function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'A valid Bearer token is required.' } });
  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    if (typeof payload.sub !== 'string' || (payload.role !== Role.TOURIST && payload.role !== Role.ADMIN)) throw new Error('Invalid token');
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch { return res.status(401).json({ error: { code: 'UNAUTHENTICATED', message: 'Your session is invalid or expired.' } }); }
}

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'smart-tourism-api' }));

app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body ?? {};
    if (typeof name !== 'string' || name.trim().length < 2 || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email) || typeof password !== 'string' || password.length < 8) {
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Name, a valid email, and an 8+ character password are required.' } });
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (await prisma.user.findUnique({ where: { email: normalizedEmail } })) return res.status(409).json({ error: { code: 'EMAIL_EXISTS', message: 'An account already exists for this email.' } });
    const user = await prisma.user.create({ data: { name: name.trim(), email: normalizedEmail, passwordHash: await bcrypt.hash(password, 12) }, select: { id: true, name: true, email: true, role: true } });
    return res.status(201).json({ user, token: signToken(user.id, user.role) });
  } catch (error) { next(error); }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body ?? {};
    const user = typeof email === 'string' ? await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } }) : null;
    if (!user || typeof password !== 'string' || !(await bcrypt.compare(password, user.passwordHash))) return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Email or password is incorrect.' } });
    return res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token: signToken(user.id, user.role) });
  } catch (error) { next(error); }
});

app.get('/api/destinations', async (req, res, next) => {
  try {
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const destinations = await prisma.destination.findMany({
      where: { status: ContentStatus.PUBLISHED, ...(category ? { category } : {}), ...(search ? { OR: [{ name: { contains: search, mode: 'insensitive' } }, { city: { contains: search, mode: 'insensitive' } }, { state: { contains: search, mode: 'insensitive' } }, { summary: { contains: search, mode: 'insensitive' } }] } : {}) },
      include: { attractions: { where: { status: ContentStatus.PUBLISHED }, select: { id: true, name: true, category: true, entryFee: true } }, _count: { select: { reviews: true } } },
      orderBy: [{ rating: 'desc' }, { name: 'asc' }]
    });
    res.json(destinations.map(toDestination));
  } catch (error) { next(error); }
});

app.get('/api/destinations/:slug', async (req, res, next) => {
  try {
    const destination = await prisma.destination.findFirst({ where: { slug: req.params.slug, status: ContentStatus.PUBLISHED }, include: { attractions: { where: { status: ContentStatus.PUBLISHED } }, reviews: { where: { status: 'APPROVED' }, include: { user: { select: { name: true } } }, orderBy: { createdAt: 'desc' } } } });
    if (!destination) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Destination was not found.' } });
    res.json(toDestination(destination));
  } catch (error) { next(error); }
});

app.get('/api/trips', requireAuth, async (req: AuthRequest, res, next) => {
  try { const trips = await prisma.trip.findMany({ where: { userId: req.user!.id }, include: { destination: true, itineraryDays: { include: { items: true }, orderBy: { dayNumber: 'asc' } }, budgetItems: true }, orderBy: { startDate: 'asc' } }); res.json(trips); } catch (error) { next(error); }
});

app.get('/api/wishlist', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const wishlist = await prisma.wishlist.findMany({
      where: { userId: req.user!.id, destinationId: { not: null } },
      include: { destination: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(wishlist);
  } catch (error) { next(error); }
});

app.post('/api/wishlist', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const { destinationId } = req.body ?? {};
    if (typeof destinationId !== 'string') return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'A destination is required.' } });
    const destination = await prisma.destination.findFirst({ where: { id: destinationId, status: ContentStatus.PUBLISHED } });
    if (!destination) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Destination was not found.' } });
    const item = await prisma.wishlist.upsert({ where: { userId_destinationId: { userId: req.user!.id, destinationId } }, update: {}, create: { userId: req.user!.id, destinationId }, include: { destination: true } });
    res.status(201).json(item);
  } catch (error) { next(error); }
});

app.delete('/api/wishlist/:destinationId', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const destinationId = req.params.destinationId;
    if (typeof destinationId !== 'string') return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'A valid destination is required.' } });
    await prisma.wishlist.delete({ where: { userId_destinationId: { userId: req.user!.id, destinationId } } });
    res.status(204).send();
  } catch (error: any) {
    if (error?.code === 'P2025') return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Wishlist item was not found.' } });
    next(error);
  }
});

app.post('/api/trips', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const { destinationId, title, startDate, endDate, travelers = 1, budget, travelStyle } = req.body ?? {};
    const start = new Date(startDate), end = new Date(endDate);
    if (!destinationId || !title || Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf()) || end < start || !Number.isInteger(travelers) || travelers < 1 || Number(budget) < 0) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Provide valid trip details and dates.' } });
    const destination = await prisma.destination.findFirst({ where: { id: destinationId, status: ContentStatus.PUBLISHED } });
    if (!destination) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Destination was not found.' } });
    const days = Math.floor((end.getTime() - start.getTime()) / 86400000) + 1;
    const trip = await prisma.trip.create({ data: { userId: req.user!.id, destinationId, title: title.trim(), startDate: start, endDate: end, travelers, budget: Number(budget), travelStyle, itineraryDays: { create: Array.from({ length: days }, (_, index) => ({ dayNumber: index + 1, dayDate: new Date(start.getTime() + index * 86400000) })) } }, include: { itineraryDays: true, destination: true } });
    res.status(201).json(trip);
  } catch (error) { next(error); }
});

app.use((_req, res) => res.status(404).json({ error: { code: 'NOT_FOUND', message: 'API route not found.' } }));
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => { console.error(error); res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'An unexpected server error occurred.' } }); });

app.listen(port, () => console.log(`Smart Tourism API running at http://localhost:${port}`));
