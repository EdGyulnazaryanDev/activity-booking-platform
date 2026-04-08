import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@platform.com' },
    update: {},
    create: {
      email: 'admin@platform.com',
      name: 'Admin User',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@platform.com' },
    update: {},
    create: {
      email: 'user@platform.com',
      name: 'Regular User',
      password: await bcrypt.hash('user123', 10),
      role: 'USER',
    },
  });

  console.log(`Users: ${admin.email}, ${user.email}`);

  // Resources
  const court = await prisma.resource.upsert({
    where: { id: 'resource-court-1' },
    update: {},
    create: {
      id: 'resource-court-1',
      name: 'Tennis Court A',
      type: 'COURT',
      isQuantifiable: false,
      totalCapacity: 1,
    },
  });

  const room = await prisma.resource.upsert({
    where: { id: 'resource-room-1' },
    update: {},
    create: {
      id: 'resource-room-1',
      name: 'Gaming Room',
      type: 'ROOM',
      isQuantifiable: true,
      totalCapacity: 20,
    },
  });

  const equipment = await prisma.resource.upsert({
    where: { id: 'resource-equip-1' },
    update: {},
    create: {
      id: 'resource-equip-1',
      name: 'Yoga Mat Set',
      type: 'EQUIPMENT',
      isQuantifiable: true,
      totalCapacity: 15,
    },
  });

  console.log(`Resources: ${court.name}, ${room.name}, ${equipment.name}`);

  // Pricing Rules
  await prisma.pricingRule.createMany({
    skipDuplicates: true,
    data: [
      { resourceId: court.id, startTime: '06:00', endTime: '12:00', hourlyRate: 10, label: 'Morning Rate' },
      { resourceId: court.id, startTime: '12:00', endTime: '18:00', hourlyRate: 15, label: 'Afternoon Rate' },
      { resourceId: court.id, startTime: '18:00', endTime: '23:00', hourlyRate: 20, label: 'Evening Rate' },
      { resourceId: room.id,  startTime: '06:00', endTime: '12:00', hourlyRate: 2,  label: 'Morning Rate' },
      { resourceId: room.id,  startTime: '12:00', endTime: '23:00', hourlyRate: 4,  label: 'Peak Rate' },
    ],
  });

  console.log('Pricing rules created');

  // Staff
  await prisma.staff.upsert({
    where: { email: 'coach@platform.com' },
    update: {},
    create: {
      name: 'Alex Coach',
      email: 'coach@platform.com',
      specialty: 'Tennis',
      availability: {
        mon: ['09:00-17:00'],
        tue: ['09:00-17:00'],
        wed: ['09:00-17:00'],
        thu: ['09:00-17:00'],
        fri: ['09:00-15:00'],
      },
    },
  });

  console.log('Staff created');

  // Sample Booking
  const start = new Date();
  start.setHours(9, 0, 0, 0);
  const end = new Date(start);
  end.setHours(10, 0, 0, 0);

  await prisma.booking.create({
    data: {
      userId: user.id,
      resourceId: court.id,
      quantity: 1,
      startTime: start,
      endTime: end,
      status: 'PENDING',
      totalPrice: 10,
      notes: 'Morning tennis session',
    },
  });

  console.log('Sample booking created');
  console.log('Done.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
