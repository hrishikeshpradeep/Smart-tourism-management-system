import 'dotenv/config';
import bcrypt from 'bcrypt';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ContentStatus, EmergencyStatus, ProviderType, Role } from '../generated/prisma/client.js';
import { prisma } from './lib/prisma.js';

export const app = express();
const port = Number(process.env.PORT ?? 4000);
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error('JWT_SECRET is not set. Add it to .env.');
const secret: string = jwtSecret;

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? true }));
app.use(express.json({ limit: '200kb' }));

type AuthRequest = Request & { user?: { id: string; role: Role } };
const signToken = (id: string, role: Role) => jwt.sign({ sub: id, role }, secret, { expiresIn: '7d' });
const toDestination = (d: any) => ({ ...d, dailyCost: Number(d.dailyCost), rating: Number(d.rating), attractions: d.attractions?.map((a: any) => ({ ...a, entryFee: Number(a.entryFee) })) });
const discoveryCategory = (text: string) => /\b(beach|island|coast|sea|ocean)\b/i.test(text) ? 'beach' : /\b(mountain|hill|himalaya|valley|peak)\b/i.test(text) ? 'mountain' : /\b(wildlife|forest|national park|sanctuary)\b/i.test(text) ? 'wildlife' : /\b(fort|temple|palace|heritage|monument|museum)\b/i.test(text) ? 'heritage' : 'city';
const discoveryBudget = (category: string) => ({ beach: 5200, mountain: 4000, wildlife: 4400, heritage: 3400, adventure: 4600, city: 3800 }[category] ?? 3800);
const conciseSummary = (text: string) => {
  const sentences = text.match(/[^.!?]+[.!?]+/g)?.map(sentence => sentence.trim()).filter(Boolean) ?? [];
  const summary = (sentences.slice(0, 2).join(' ') || text).trim();
  return summary.length > 300 ? `${summary.slice(0, 297).trimEnd()}…` : summary;
};
const localGuideCache = new Map<string, { expiresAt: number; data: unknown }>();
const mapHeaders = { accept: 'application/json', 'user-agent': 'SmartYatra course project local-guide/1.0' };
const mapPlace = (element: { id: number; type: string; lat?: number; lon?: number; center?: { lat: number; lon: number }; tags?: Record<string, string> }) => {
  const latitude = element.lat ?? element.center?.lat, longitude = element.lon ?? element.center?.lon, tags = element.tags ?? {};
  return { id: `${element.type}/${element.id}`, name: tags.name ?? tags.brand ?? 'Unnamed mapped place', type: tags.tourism ?? tags.amenity ?? 'local place', mapsUrl: latitude !== undefined && longitude !== undefined ? `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=18/${latitude}/${longitude}` : null };
};

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

app.get('/api/destinations/:slug/local-guide', async (req, res, next) => {
  try {
    const destination = await prisma.destination.findFirst({ where: { slug: req.params.slug, status: ContentStatus.PUBLISHED }, select: { id: true, name: true, city: true, state: true, latitude: true, longitude: true } });
    if (!destination) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Destination was not found.' } });
    const cached = localGuideCache.get(destination.id);
    if (cached && cached.expiresAt > Date.now()) return res.json(cached.data);

    let latitude = destination.latitude === null ? null : Number(destination.latitude), longitude = destination.longitude === null ? null : Number(destination.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      const geocoding = new URL('https://nominatim.openstreetmap.org/search');
      geocoding.search = new URLSearchParams({ q: `${destination.city}, ${destination.state}, India`, format: 'jsonv2', limit: '1' }).toString();
      const geocodeResponse = await fetch(geocoding, { headers: mapHeaders });
      const geocoded = geocodeResponse.ok ? await geocodeResponse.json() as Array<{ lat: string; lon: string }> : [];
      latitude = geocoded[0] ? Number(geocoded[0].lat) : null;
      longitude = geocoded[0] ? Number(geocoded[0].lon) : null;
      if (Number.isFinite(latitude) && Number.isFinite(longitude)) await prisma.destination.update({ where: { id: destination.id }, data: { latitude, longitude } });
    }
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return res.json({ source: 'OpenStreetMap', hotels: [], dining: [], transport: [], note: 'A precise map location is not available for this destination yet.' });

    const overpassQuery = `[out:json][timeout:20];(nwr["tourism"~"hotel|guest_house|hostel"](around:10000,${latitude},${longitude});nwr["amenity"~"restaurant|cafe"](around:8000,${latitude},${longitude});nwr["amenity"~"taxi|bus_station|ferry_terminal"](around:12000,${latitude},${longitude}););out center 160;`;
    const overpassResponse = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', headers: { ...mapHeaders, 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ data: overpassQuery }) });
    const overpassData = overpassResponse.ok ? await overpassResponse.json() as { elements?: Array<{ id: number; type: string; lat?: number; lon?: number; center?: { lat: number; lon: number }; tags?: Record<string, string> }> } : {};
    const entries = (overpassData.elements ?? []).map(mapPlace).filter(place => place.name !== 'Unnamed mapped place');
    const guide = {
      source: 'OpenStreetMap',
      hotels: entries.filter(place => ['hotel', 'guest_house', 'hostel'].includes(place.type)).slice(0, 3),
      dining: entries.filter(place => ['restaurant', 'cafe'].includes(place.type)).slice(0, 3),
      transport: entries.filter(place => ['taxi', 'bus_station', 'ferry_terminal'].includes(place.type)).slice(0, 3),
      note: 'Named places are map listings; confirm availability, price, and opening hours directly with the provider.'
    };
    localGuideCache.set(destination.id, { expiresAt: Date.now() + 6 * 60 * 60 * 1000, data: guide });
    res.json(guide);
  } catch (error) { next(error); }
});

app.get('/api/discover', async (req, res, next) => {
  try {
    const query = typeof req.query.q === 'string' ? req.query.q.trim().replace(/\s+/g, ' ') : '';
    if (query.length < 3 || query.length > 80) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Enter a destination between 3 and 80 characters.' } });
    const wikipedia = new URL('https://en.wikipedia.org/w/api.php');
    wikipedia.search = new URLSearchParams({ action: 'query', format: 'json', generator: 'search', gsrsearch: query, gsrnamespace: '0', gsrlimit: '5', prop: 'extracts|pageimages|coordinates', exintro: '1', explaintext: '1', piprop: 'thumbnail', pithumbsize: '1200', origin: '*' }).toString();
    const lookup = await fetch(wikipedia, { headers: { accept: 'application/json' } });
    if (!lookup.ok) throw new Error(`Discovery source returned ${lookup.status}`);
    const result = await lookup.json() as { query?: { pages?: Record<string, { pageid: number; title: string; extract?: string; thumbnail?: { source?: string }; coordinates?: Array<{ lat: number; lon: number }> }> } };
    const pages = Object.values(result.query?.pages ?? {});
    const page = pages.find(item => item.extract || item.thumbnail?.source);
    if (!page) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'No reliable destination details were found. Try a more specific place name.' } });
    const overview = conciseSummary(page.extract?.trim() || `${page.title} is available to explore with local planning research.`);
    const category = discoveryCategory(`${page.title} ${overview}`);
    const suggestionsUrl = new URL('https://en.wikipedia.org/w/api.php');
    suggestionsUrl.search = new URLSearchParams({ action: 'query', format: 'json', list: 'search', srsearch: `${page.title} tourist attractions`, srnamespace: '0', srlimit: '4', origin: '*' }).toString();
    const suggestionsResponse = await fetch(suggestionsUrl, { headers: { accept: 'application/json' } });
    const suggestionsPayload = suggestionsResponse.ok ? await suggestionsResponse.json() as { query?: { search?: Array<{ title: string }> } } : {};
    const placeTerms = page.title.toLowerCase().split(/\s+/).filter(term => term.length > 3);
    const attractions = (suggestionsPayload.query?.search ?? [])
      .map(item => item.title)
      .filter(title => title !== page.title && !/^list of /i.test(title))
      .filter(title => placeTerms.some(term => title.toLowerCase().includes(term)))
      .slice(0, 3);
    res.json({
      id: `discovery-${page.pageid}`,
      slug: `discovery-${page.pageid}`,
      name: page.title,
      region: 'India',
      style: category,
      summary: overview,
      image: page.thumbnail?.source || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=88',
      cost: discoveryBudget(category),
      rating: 0,
      best: 'Check local seasonal guidance',
      attractions: attractions.length ? attractions : ['Local landmarks', 'Regional food', 'Neighbourhood walks'],
      latitude: page.coordinates?.[0]?.lat ?? null,
      longitude: page.coordinates?.[0]?.lon ?? null,
      source: 'Wikipedia',
      isDiscovery: true
    });
  } catch (error) { next(error); }
});

app.post('/api/discovered-destinations', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const { slug, name, summary, image, style, cost, latitude, longitude } = req.body ?? {};
    if (typeof slug !== 'string' || !/^discovery-\d+$/.test(slug) || typeof name !== 'string' || !name.trim() || typeof summary !== 'string' || !summary.trim() || typeof image !== 'string' || !image.startsWith('https://') || typeof style !== 'string' || !Number.isFinite(Number(cost))) {
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'The discovered destination details are invalid.' } });
    }
    const category = ['beach', 'mountain', 'wildlife', 'heritage', 'adventure', 'city'].includes(style) ? style : 'city';
    const destination = await prisma.destination.upsert({
      where: { slug },
      update: { name: name.trim().slice(0, 120), city: name.trim().slice(0, 120), state: 'India', category, summary: conciseSummary(summary), dailyCost: Number(cost), imageUrl: image, latitude: Number.isFinite(Number(latitude)) ? Number(latitude) : null, longitude: Number.isFinite(Number(longitude)) ? Number(longitude) : null, bestSeason: 'Check local seasonal guidance', status: ContentStatus.PUBLISHED },
      create: { name: name.trim().slice(0, 120), slug, city: name.trim().slice(0, 120), state: 'India', category, summary: conciseSummary(summary), dailyCost: Number(cost), imageUrl: image, latitude: Number.isFinite(Number(latitude)) ? Number(latitude) : null, longitude: Number.isFinite(Number(longitude)) ? Number(longitude) : null, bestSeason: 'Check local seasonal guidance', status: ContentStatus.PUBLISHED }
    });
    res.status(201).json(toDestination(destination));
  } catch (error) { next(error); }
});

app.get('/api/destinations/:slug', async (req, res, next) => {
  try {
    const destination = await prisma.destination.findFirst({ where: { slug: req.params.slug, status: ContentStatus.PUBLISHED }, include: { attractions: { where: { status: ContentStatus.PUBLISHED } }, reviews: { where: { status: 'APPROVED' }, include: { user: { select: { name: true } } }, orderBy: { createdAt: 'desc' } } } });
    if (!destination) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Destination was not found.' } });
    res.json(toDestination(destination));
  } catch (error) { next(error); }
});

app.get('/api/destinations/:slug/services', async (req, res, next) => {
  try {
    const destination = await prisma.destination.findFirst({ where: { slug: req.params.slug, status: ContentStatus.PUBLISHED }, select: { id: true } });
    if (!destination) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Destination was not found.' } });
    const providers = await prisma.serviceProvider.findMany({ where: { destinationId: destination.id, status: ContentStatus.PUBLISHED }, orderBy: [{ providerType: 'asc' }, { priceFrom: 'asc' }] });
    res.json(providers.map(provider => ({ ...provider, priceFrom: provider.priceFrom === null ? null : Number(provider.priceFrom) })));
  } catch (error) { next(error); }
});

app.get('/api/trips', requireAuth, async (req: AuthRequest, res, next) => {
  try { const trips = await prisma.trip.findMany({ where: { userId: req.user!.id }, include: { destination: true, itineraryDays: { include: { items: true }, orderBy: { dayNumber: 'asc' } }, budgetItems: true }, orderBy: { startDate: 'asc' } }); res.json(trips); } catch (error) { next(error); }
});

app.delete('/api/trips/:tripId', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const tripId = req.params.tripId;
    if (typeof tripId !== 'string') return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'A valid trip is required.' } });
    const deleted = await prisma.trip.deleteMany({ where: { id: tripId, userId: req.user!.id } });
    if (!deleted.count) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Trip was not found.' } });
    res.status(204).send();
  } catch (error) { next(error); }
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
    const { destinationId, title, startDate, endDate, travelers = 1, budget, travelStyle, routeStopIds = [] } = req.body ?? {};
    const start = new Date(startDate), end = new Date(endDate);
    if (!destinationId || !title || Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf()) || end < start || !Number.isInteger(travelers) || travelers < 1 || Number(budget) < 0) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Provide valid trip details and dates.' } });
    const destination = await prisma.destination.findFirst({ where: { id: destinationId, status: ContentStatus.PUBLISHED } });
    if (!destination) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Destination was not found.' } });
    const days = Math.floor((end.getTime() - start.getTime()) / 86400000) + 1;
    const requestedStops = Array.isArray(routeStopIds) ? [...new Set(routeStopIds.filter((id): id is string => typeof id === 'string'))].slice(0, 12) : [];
    const validStops = requestedStops.length ? await prisma.destination.findMany({ where: { id: { in: requestedStops }, status: ContentStatus.PUBLISHED }, select: { id: true } }) : [];
    const orderedStopIds = [destinationId, ...validStops.map(stop => stop.id).filter(id => id !== destinationId)];
    const trip = await prisma.trip.create({ data: { userId: req.user!.id, destinationId, title: title.trim(), startDate: start, endDate: end, travelers, budget: Number(budget), travelStyle, itineraryDays: { create: Array.from({ length: days }, (_, index) => ({ dayNumber: index + 1, dayDate: new Date(start.getTime() + index * 86400000) })) }, routeStops: { create: orderedStopIds.map((id, index) => ({ destinationId: id, sequence: index + 1, crowdLevel: index === 0 ? 'Moderate' : 'Comfortable', visitWindow: index === 0 ? 'Early morning' : 'Late afternoon' })) } }, include: { itineraryDays: true, destination: true, routeStops: { include: { destination: true }, orderBy: { sequence: 'asc' } } } });
    res.status(201).json(trip);
  } catch (error) { next(error); }
});

app.get('/api/bookings', requireAuth, async (req: AuthRequest, res, next) => {
  try { const bookings = await prisma.bookingRequest.findMany({ where: { userId: req.user!.id }, include: { provider: true, trip: { include: { destination: true } } }, orderBy: { createdAt: 'desc' } }); res.json(bookings); } catch (error) { next(error); }
});

app.post('/api/bookings', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const { providerId, tripId, startDate, endDate, guests = 1, note } = req.body ?? {};
    const start = new Date(startDate), end = new Date(endDate);
    if (typeof providerId !== 'string' || Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf()) || end < start || !Number.isInteger(guests) || guests < 1 || guests > 20) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Provide a provider, valid dates, and 1–20 guests.' } });
    const provider = await prisma.serviceProvider.findFirst({ where: { id: providerId, status: ContentStatus.PUBLISHED } });
    if (!provider) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Service provider was not found.' } });
    if (tripId) { const trip = await prisma.trip.findFirst({ where: { id: tripId, userId: req.user!.id } }); if (!trip) return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Trip was not found.' } }); }
    const booking = await prisma.bookingRequest.create({ data: { userId: req.user!.id, tripId: typeof tripId === 'string' ? tripId : null, providerId: provider.id, providerType: provider.providerType, providerName: provider.name, startDate: start, endDate: end, guests, note: typeof note === 'string' ? note.slice(0, 500) : null } });
    res.status(201).json(booking);
  } catch (error) { next(error); }
});

app.get('/api/emergency-alerts', requireAuth, async (req: AuthRequest, res, next) => {
  try { res.json(await prisma.emergencyAlert.findMany({ where: { userId: req.user!.id }, orderBy: { createdAt: 'desc' }, take: 20 })); } catch (error) { next(error); }
});

app.post('/api/emergency-alerts', requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const { destinationId, latitude, longitude, message } = req.body ?? {};
    if (typeof destinationId !== 'undefined' && typeof destinationId !== 'string') return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Destination is invalid.' } });
    if ((latitude !== undefined && !Number.isFinite(Number(latitude))) || (longitude !== undefined && !Number.isFinite(Number(longitude)))) return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'Location coordinates are invalid.' } });
    const alert = await prisma.emergencyAlert.create({ data: { userId: req.user!.id, destinationId: typeof destinationId === 'string' ? destinationId : null, latitude: latitude === undefined ? null : Number(latitude), longitude: longitude === undefined ? null : Number(longitude), message: typeof message === 'string' ? message.slice(0, 500) : null, status: EmergencyStatus.OPEN } });
    res.status(201).json(alert);
  } catch (error) { next(error); }
});

app.use((_req, res) => res.status(404).json({ error: { code: 'NOT_FOUND', message: 'API route not found.' } }));
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => { console.error(error); res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'An unexpected server error occurred.' } }); });

if (!process.env.VERCEL) app.listen(port, () => console.log(`Smart Tourism API running at http://localhost:${port}`));
export default app;
