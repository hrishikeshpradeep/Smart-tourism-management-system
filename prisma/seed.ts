import 'dotenv/config';
import { ContentStatus } from '../generated/prisma/client.js';
import { prisma } from '../src/lib/prisma.js';

const destinations = [
  { name: 'Goa', slug: 'goa', city: 'Panaji', state: 'Goa', category: 'beach', summary: 'Sunlit beaches, Portuguese heritage and coastal food.', dailyCost: 3800, rating: 4.7, bestSeason: 'November to February', attractions: ['Palolem Beach', 'Fontainhas', 'Dudhsagar Falls'] },
  { name: 'Manali', slug: 'manali', city: 'Manali', state: 'Himachal Pradesh', category: 'mountain', summary: 'A cool mountain base for forests, cafes and Himalayan adventure.', dailyCost: 3400, rating: 4.8, bestSeason: 'October to June', attractions: ['Solang Valley', 'Hadimba Temple', 'Old Manali'] },
  { name: 'Jaipur', slug: 'jaipur', city: 'Jaipur', state: 'Rajasthan', category: 'heritage', summary: 'Palaces, bazaars and living craft traditions in the Pink City.', dailyCost: 3100, rating: 4.6, bestSeason: 'October to March', attractions: ['Amber Fort', 'City Palace', 'Hawa Mahal'] },
  { name: 'Munnar', slug: 'munnar', city: 'Munnar', state: 'Kerala', category: 'mountain', summary: 'Tea gardens, misty viewpoints and gentle nature walks.', dailyCost: 2700, rating: 4.7, bestSeason: 'September to March', attractions: ['Tea Museum', 'Eravikulam Park', 'Top Station'] }
];

async function main() {
  for (const d of destinations) await prisma.destination.upsert({ where: { slug: d.slug }, update: { ...d, status: ContentStatus.PUBLISHED, attractions: { deleteMany: {}, create: d.attractions.map(name => ({ name, category: 'experience', description: `A popular ${name} experience.`, entryFee: 0 })) } }, create: { ...d, status: ContentStatus.PUBLISHED, attractions: { create: d.attractions.map(name => ({ name, category: 'experience', description: `A popular ${name} experience.`, entryFee: 0 })) } } });
  console.log('Seeded Smart Tourism destinations.');
}
main().finally(() => prisma.$disconnect());
