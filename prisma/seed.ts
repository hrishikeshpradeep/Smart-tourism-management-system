import 'dotenv/config';
import { ContentStatus, ProviderType } from '../generated/prisma/client.js';
import { prisma } from '../src/lib/prisma.js';

const destinations = [
  { name: 'Goa', slug: 'goa', city: 'Panaji', state: 'Goa', category: 'beach', summary: 'Sunlit beaches, Portuguese heritage and coastal food.', dailyCost: 4200, rating: 4.7, bestSeason: 'November to February', imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=88', attractions: ['Palolem Beach', 'Fontainhas', 'Dudhsagar Falls'] },
  { name: 'Manali', slug: 'manali', city: 'Manali', state: 'Himachal Pradesh', category: 'mountain', summary: 'A cool mountain base for forests, cafes and Himalayan adventure.', dailyCost: 3600, rating: 4.8, bestSeason: 'October to June', imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1800&q=88', attractions: ['Solang Valley', 'Hadimba Temple', 'Old Manali'] },
  { name: 'Jaipur', slug: 'jaipur', city: 'Jaipur', state: 'Rajasthan', category: 'heritage', summary: 'Palaces, bazaars and living craft traditions in the Pink City.', dailyCost: 3300, rating: 4.6, bestSeason: 'October to March', imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1800&q=88', attractions: ['Amber Fort', 'City Palace', 'Hawa Mahal'] },
  { name: 'Munnar', slug: 'munnar', city: 'Munnar', state: 'Kerala', category: 'mountain', summary: 'Tea gardens, misty viewpoints and gentle nature walks.', dailyCost: 3200, rating: 4.7, bestSeason: 'September to March', imageUrl: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1800&q=88', attractions: ['Tea Museum', 'Eravikulam Park', 'Top Station'] },
  { name: 'Varanasi', slug: 'varanasi', city: 'Varanasi', state: 'Uttar Pradesh', category: 'culture', summary: 'Ancient ghats, spiritual ceremonies and celebrated street food.', dailyCost: 2500, rating: 4.6, bestSeason: 'October to March', imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1800&q=88', attractions: ['Dashashwamedh Ghat', 'Ganga Aarti', 'Sarnath'] },
  { name: 'Coorg', slug: 'coorg', city: 'Madikeri', state: 'Karnataka', category: 'nature', summary: 'Coffee estates, waterfalls and forested Western Ghats escapes.', dailyCost: 3400, rating: 4.6, bestSeason: 'October to March', imageUrl: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=1800&q=88', attractions: ['Abbey Falls', 'Raja Seat', 'Dubare Elephant Camp'] },
  { name: 'Kashmir', slug: 'kashmir', city: 'Srinagar', state: 'Jammu and Kashmir', category: 'mountain', summary: 'Alpine valleys, shikara rides and snow-framed mountain scenery.', dailyCost: 4400, rating: 4.8, bestSeason: 'April to October', imageUrl: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1800&q=88', attractions: ['Dal Lake', 'Gulmarg', 'Pahalgam'] },
  { name: 'Ladakh', slug: 'ladakh', city: 'Leh', state: 'Ladakh', category: 'adventure', summary: 'High-altitude passes, stark valleys and unforgettable stargazing.', dailyCost: 5400, rating: 4.9, bestSeason: 'May to September', imageUrl: 'https://images.unsplash.com/photo-1626014303757-63671d2b0b84?auto=format&fit=crop&w=1800&q=88', attractions: ['Pangong Lake', 'Nubra Valley', 'Khardung La'] },
  { name: 'Rishikesh', slug: 'rishikesh', city: 'Rishikesh', state: 'Uttarakhand', category: 'adventure', summary: 'River adventures, yoga retreats and peaceful Ganga-side evenings.', dailyCost: 2900, rating: 4.7, bestSeason: 'September to April', imageUrl: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1800&q=88', attractions: ['Laxman Jhula', 'River rafting', 'Ganga Aarti'] },
  { name: 'Udaipur', slug: 'udaipur', city: 'Udaipur', state: 'Rajasthan', category: 'heritage', summary: 'Romantic lakes, royal palaces and golden-hour views in the City of Lakes.', dailyCost: 3800, rating: 4.8, bestSeason: 'October to March', imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=88', attractions: ['City Palace', 'Lake Pichola', 'Sajjangarh Palace'] },
  { name: 'Andaman Islands', slug: 'andaman', city: 'Port Blair', state: 'Andaman and Nicobar Islands', category: 'beach', summary: 'Clear-water beaches, coral reefs and slow island days.', dailyCost: 6500, rating: 4.8, bestSeason: 'October to May', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=88', attractions: ['Radhanagar Beach', 'Cellular Jail', 'Havelock Island'] },
  { name: 'Darjeeling', slug: 'darjeeling', city: 'Darjeeling', state: 'West Bengal', category: 'mountain', summary: 'Tea slopes, toy-train charm and Himalayan sunrise views.', dailyCost: 3200, rating: 4.6, bestSeason: 'March to May and October to December', imageUrl: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=88', attractions: ['Tiger Hill', 'Darjeeling Himalayan Railway', 'Tea Gardens'] },
  { name: 'Pondicherry', slug: 'pondicherry', city: 'Puducherry', state: 'Puducherry', category: 'coastal', summary: 'French-quarter walks, café culture and laid-back beaches.', dailyCost: 3300, rating: 4.5, bestSeason: 'October to March', imageUrl: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1800&q=88', attractions: ['White Town', 'Promenade Beach', 'Auroville'] },
  { name: 'Hampi', slug: 'hampi', city: 'Hampi', state: 'Karnataka', category: 'heritage', summary: 'Ancient temple ruins and giant boulders beside the Tungabhadra.', dailyCost: 2700, rating: 4.7, bestSeason: 'October to February', imageUrl: 'https://images.unsplash.com/photo-1600100397608-f010e40d9c9b?auto=format&fit=crop&w=1800&q=88', attractions: ['Virupaksha Temple', 'Vittala Temple', 'Matanga Hill'] },
  { name: 'Ooty', slug: 'ooty', city: 'Ooty', state: 'Tamil Nadu', category: 'nature', summary: 'Cool Nilgiri air, tea estates and gentle lakeside escapes.', dailyCost: 3000, rating: 4.5, bestSeason: 'October to June', imageUrl: 'https://images.unsplash.com/photo-1551061787-6a9e95e88f80?auto=format&fit=crop&w=1800&q=88', attractions: ['Ooty Lake', 'Doddabetta Peak', 'Nilgiri Mountain Railway'] }
];

// Clearly labelled course-project sample feedback. These are approved for display,
// but are not represented as real customer reviews.
const sampleReviews = [
  { name: 'Ananya K.', email: 'demo.ananya@example.com', slug: 'goa', rating: 5, body: 'The beach and food suggestions made planning a short break feel effortless.' },
  { name: 'Rohan V.', email: 'demo.rohan@example.com', slug: 'manali', rating: 5, body: 'I liked seeing the daily budget before deciding how many days to stay.' },
  { name: 'Shreya M.', email: 'demo.shreya@example.com', slug: 'munnar', rating: 5, body: 'The tea-estate and viewpoint ideas are exactly the calm itinerary I wanted.' },
  { name: 'Pranav A.', email: 'demo.pranav@example.com', slug: 'jaipur', rating: 5, body: 'The map shortcut was useful for checking landmark locations while browsing.' },
  { name: 'Nisha D.', email: 'demo.nisha@example.com', slug: 'rishikesh', rating: 5, body: 'The experience list balanced rafting, yoga and the evening aarti nicely.' },
  { name: 'Irfan K.', email: 'demo.irfan@example.com', slug: 'kashmir', rating: 5, body: 'Clear seasons and cost estimates made it much easier to compare options.' },
  { name: 'Tanvi L.', email: 'demo.tanvi@example.com', slug: 'udaipur', rating: 5, body: 'The destination card looks beautiful and still gives the important details.' },
  { name: 'Gautam S.', email: 'demo.gautam@example.com', slug: 'hampi', rating: 5, body: 'A good starting point for travellers who want culture without hidden jargon.' }
];

async function main() {
  for (const d of destinations) await prisma.destination.upsert({ where: { slug: d.slug }, update: { ...d, status: ContentStatus.PUBLISHED, attractions: { deleteMany: {}, create: d.attractions.map(name => ({ name, category: 'experience', description: `A popular ${name} experience.`, entryFee: 0 })) } }, create: { ...d, status: ContentStatus.PUBLISHED, attractions: { create: d.attractions.map(name => ({ name, category: 'experience', description: `A popular ${name} experience.`, entryFee: 0 })) } } });
  for (const destination of await prisma.destination.findMany({ select: { id: true, name: true, category: true } })) {
    const vehicleLabel = destination.category === 'mountain' || destination.category === 'adventure' ? 'Hills & Highway SUV' : 'Local Explorer Cab';
    const providers = [
      { providerType: ProviderType.HOTEL, name: `${destination.name} Comfort Stay`, description: 'A course-project sample stay provider near the destination centre.', priceFrom: 2600 },
      { providerType: ProviderType.RESTAURANT, name: `${destination.name} Local Table`, description: 'A course-project sample restaurant serving regional favourites.', priceFrom: 450 },
      { providerType: ProviderType.VEHICLE, name: vehicleLabel, description: 'A course-project sample vehicle provider for local sightseeing.', priceFrom: 1400 }
    ];
    for (const provider of providers) await prisma.serviceProvider.upsert({ where: { destinationId_providerType_name: { destinationId: destination.id, providerType: provider.providerType, name: provider.name } }, update: provider, create: { ...provider, destinationId: destination.id } });
  }
  for (const review of sampleReviews) {
    const user = await prisma.user.upsert({ where: { email: review.email }, update: { name: review.name, preferencesJson: { source: 'course-project-demo', approvedFeedback: true } }, create: { name: review.name, email: review.email, passwordHash: 'DEMO_ACCOUNT_NOT_FOR_LOGIN', preferencesJson: { source: 'course-project-demo', approvedFeedback: true } } });
    const destination = await prisma.destination.findUniqueOrThrow({ where: { slug: review.slug } });
    await prisma.review.upsert({ where: { userId_destinationId: { userId: user.id, destinationId: destination.id } }, update: { rating: review.rating, body: review.body, status: 'APPROVED' }, create: { userId: user.id, destinationId: destination.id, rating: review.rating, body: review.body, status: 'APPROVED' } });
  }
  console.log('Seeded 15 destinations and 8 sample approved reviews.');
}
main().finally(() => prisma.$disconnect());
