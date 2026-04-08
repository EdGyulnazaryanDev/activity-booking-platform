import 'dotenv/config';
import { PrismaClient, Role, ResourceType, BookingStatus } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // ── Users ──────────────────────────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      name: 'Admin',
      password: await bcrypt.hash('password', 10),
      role: Role.ADMIN,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@gmail.com' },
    update: {},
    create: {
      email: 'user@gmail.com',
      name: 'Regular User',
      password: await bcrypt.hash('password', 10),
      role: Role.USER,
    },
  });

  console.log(`Users: ${admin.email}, ${user.email}`);

  // ── Resources (Activities) ─────────────────────────────────────────────────
  const resources = [
    // COURTS
    { id: 'court-tennis-a',    name: 'Tennis Court A',     type: ResourceType.COURT,     isQuantifiable: false, totalCapacity: 1 },
    { id: 'court-tennis-b',    name: 'Tennis Court B',     type: ResourceType.COURT,     isQuantifiable: false, totalCapacity: 1 },
    { id: 'court-basketball',  name: 'Basketball Court',   type: ResourceType.COURT,     isQuantifiable: false, totalCapacity: 1 },
    { id: 'court-volleyball',  name: 'Volleyball Court',   type: ResourceType.COURT,     isQuantifiable: false, totalCapacity: 1 },
    { id: 'court-badminton-a', name: 'Badminton Court A',  type: ResourceType.COURT,     isQuantifiable: false, totalCapacity: 1 },
    { id: 'court-badminton-b', name: 'Badminton Court B',  type: ResourceType.COURT,     isQuantifiable: false, totalCapacity: 1 },
    { id: 'court-squash',      name: 'Squash Court',       type: ResourceType.COURT,     isQuantifiable: false, totalCapacity: 1 },
    { id: 'court-football',    name: 'Football Pitch',     type: ResourceType.COURT,     isQuantifiable: false, totalCapacity: 1 },
    // ROOMS
    { id: 'room-gaming',       name: 'Gaming Room',        type: ResourceType.ROOM,      isQuantifiable: true,  totalCapacity: 20 },
    { id: 'room-yoga',         name: 'Yoga Studio',        type: ResourceType.ROOM,      isQuantifiable: false, totalCapacity: 1 },
    { id: 'room-dance',        name: 'Dance Studio',       type: ResourceType.ROOM,      isQuantifiable: false, totalCapacity: 1 },
    { id: 'room-boxing',       name: 'Boxing Room',        type: ResourceType.ROOM,      isQuantifiable: false, totalCapacity: 1 },
    { id: 'room-meeting',      name: 'Meeting Room',       type: ResourceType.ROOM,      isQuantifiable: false, totalCapacity: 1 },
    { id: 'room-pool',         name: 'Swimming Pool Lane', type: ResourceType.ROOM,      isQuantifiable: true,  totalCapacity: 8  },
    // EQUIPMENT
    { id: 'equip-bikes',       name: 'Cycling Bikes',      type: ResourceType.EQUIPMENT, isQuantifiable: true,  totalCapacity: 15 },
    { id: 'equip-kayaks',      name: 'Kayaks',             type: ResourceType.EQUIPMENT, isQuantifiable: true,  totalCapacity: 6  },
    { id: 'equip-yoga-mats',   name: 'Yoga Mats',          type: ResourceType.EQUIPMENT, isQuantifiable: true,  totalCapacity: 20 },
    { id: 'equip-tennis-rack', name: 'Tennis Rackets',     type: ResourceType.EQUIPMENT, isQuantifiable: true,  totalCapacity: 10 },
    { id: 'equip-ski',         name: 'Ski Equipment Set',  type: ResourceType.EQUIPMENT, isQuantifiable: true,  totalCapacity: 8  },
    { id: 'equip-climbing',    name: 'Climbing Gear Set',  type: ResourceType.EQUIPMENT, isQuantifiable: true,  totalCapacity: 10 },
  ];

  for (const r of resources) {
    await prisma.resource.upsert({ where: { id: r.id }, update: {}, create: r });
  }
  console.log(`Created ${resources.length} resources`);

  // ── Pricing Rules ──────────────────────────────────────────────────────────
  const pricingData = [
    // Tennis Courts
    ...['court-tennis-a', 'court-tennis-b'].flatMap(id => [
      { resourceId: id, startTime: '06:00', endTime: '12:00', hourlyRate: 8,  label: 'Morning Rate' },
      { resourceId: id, startTime: '12:00', endTime: '18:00', hourlyRate: 12, label: 'Afternoon Rate' },
      { resourceId: id, startTime: '18:00', endTime: '23:00', hourlyRate: 18, label: 'Evening Rate' },
    ]),
    // Basketball / Volleyball / Football
    ...['court-basketball', 'court-volleyball', 'court-football'].flatMap(id => [
      { resourceId: id, startTime: '06:00', endTime: '12:00', hourlyRate: 10, label: 'Morning Rate' },
      { resourceId: id, startTime: '12:00', endTime: '18:00', hourlyRate: 15, label: 'Afternoon Rate' },
      { resourceId: id, startTime: '18:00', endTime: '23:00', hourlyRate: 20, label: 'Evening Rate' },
    ]),
    // Badminton / Squash
    ...['court-badminton-a', 'court-badminton-b', 'court-squash'].flatMap(id => [
      { resourceId: id, startTime: '06:00', endTime: '12:00', hourlyRate: 6,  label: 'Morning Rate' },
      { resourceId: id, startTime: '12:00', endTime: '18:00', hourlyRate: 9,  label: 'Afternoon Rate' },
      { resourceId: id, startTime: '18:00', endTime: '23:00', hourlyRate: 12, label: 'Evening Rate' },
    ]),
    // Gaming Room (per PC)
    { resourceId: 'room-gaming', startTime: '06:00', endTime: '12:00', hourlyRate: 2, label: 'Morning Rate' },
    { resourceId: 'room-gaming', startTime: '12:00', endTime: '23:00', hourlyRate: 3, label: 'Peak Rate' },
    // Yoga / Dance / Boxing studios
    ...['room-yoga', 'room-dance', 'room-boxing'].flatMap(id => [
      { resourceId: id, startTime: '06:00', endTime: '12:00', hourlyRate: 15, label: 'Morning Rate' },
      { resourceId: id, startTime: '12:00', endTime: '18:00', hourlyRate: 20, label: 'Afternoon Rate' },
      { resourceId: id, startTime: '18:00', endTime: '23:00', hourlyRate: 25, label: 'Evening Rate' },
    ]),
    // Meeting Room
    { resourceId: 'room-meeting', startTime: '06:00', endTime: '12:00', hourlyRate: 20, label: 'Morning Rate' },
    { resourceId: 'room-meeting', startTime: '12:00', endTime: '18:00', hourlyRate: 30, label: 'Business Hours' },
    { resourceId: 'room-meeting', startTime: '18:00', endTime: '23:00', hourlyRate: 25, label: 'Evening Rate' },
    // Pool lanes
    { resourceId: 'room-pool', startTime: '06:00', endTime: '12:00', hourlyRate: 5, label: 'Morning Rate' },
    { resourceId: 'room-pool', startTime: '12:00', endTime: '23:00', hourlyRate: 8, label: 'Peak Rate' },
    // Equipment (flat rate)
    { resourceId: 'equip-bikes',       startTime: '06:00', endTime: '23:00', hourlyRate: 3,  label: 'Standard Rate' },
    { resourceId: 'equip-kayaks',      startTime: '06:00', endTime: '23:00', hourlyRate: 8,  label: 'Standard Rate' },
    { resourceId: 'equip-yoga-mats',   startTime: '06:00', endTime: '23:00', hourlyRate: 1,  label: 'Standard Rate' },
    { resourceId: 'equip-tennis-rack', startTime: '06:00', endTime: '23:00', hourlyRate: 2,  label: 'Standard Rate' },
    { resourceId: 'equip-ski',         startTime: '06:00', endTime: '23:00', hourlyRate: 10, label: 'Standard Rate' },
    { resourceId: 'equip-climbing',    startTime: '06:00', endTime: '23:00', hourlyRate: 5,  label: 'Standard Rate' },
  ];

  await prisma.pricingRule.createMany({ skipDuplicates: true, data: pricingData });
  console.log(`Created ${pricingData.length} pricing rules`);

  // ── Staff ──────────────────────────────────────────────────────────────────
  const staffData = [
    { email: 'tennis.coach@platform.com', name: 'Alex Petrosyan',  specialty: 'Tennis',    availability: { mon: ['08:00-18:00'], wed: ['08:00-18:00'], fri: ['08:00-16:00'] } },
    { email: 'yoga.coach@platform.com',   name: 'Maria Sargsyan',  specialty: 'Yoga',      availability: { mon: ['07:00-13:00'], tue: ['07:00-13:00'], thu: ['07:00-13:00'], sat: ['08:00-12:00'] } },
    { email: 'boxing.coach@platform.com', name: 'Armen Hakobyan',  specialty: 'Boxing',    availability: { tue: ['10:00-20:00'], thu: ['10:00-20:00'], sat: ['10:00-18:00'] } },
    { email: 'swim.coach@platform.com',   name: 'Nare Grigoryan',  specialty: 'Swimming',  availability: { mon: ['06:00-14:00'], wed: ['06:00-14:00'], fri: ['06:00-14:00'] } },
    { email: 'dance.coach@platform.com',  name: 'Lilit Vardanyan', specialty: 'Dance',     availability: { tue: ['14:00-21:00'], thu: ['14:00-21:00'], sat: ['12:00-20:00'] } },
  ];

  for (const s of staffData) {
    await prisma.staff.upsert({ where: { email: s.email }, update: {}, create: s });
  }
  console.log(`Created ${staffData.length} staff members`);

  // ── Sample Booking ─────────────────────────────────────────────────────────
  const start = new Date();
  start.setHours(9, 0, 0, 0);
  const end = new Date(start);
  end.setHours(10, 0, 0, 0);

  await prisma.booking.create({
    data: {
      userId: user.id,
      resourceId: 'court-tennis-a',
      quantity: 1,
      startTime: start,
      endTime: end,
      status: BookingStatus.PENDING,
      totalPrice: 8,
      notes: 'Morning tennis session',
    },
  });

  console.log('Sample booking created');
  console.log('\nSeeding complete.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
