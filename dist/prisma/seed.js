"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("../generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const bcrypt = __importStar(require("bcryptjs"));
const adapter = new adapter_pg_1.PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Seeding database...');
    const admin = await prisma.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: {},
        create: {
            email: 'admin@gmail.com',
            name: 'Admin',
            password: await bcrypt.hash('password', 10),
            role: client_1.Role.ADMIN,
        },
    });
    const user = await prisma.user.upsert({
        where: { email: 'user@gmail.com' },
        update: {},
        create: {
            email: 'user@gmail.com',
            name: 'Regular User',
            password: await bcrypt.hash('password', 10),
            role: client_1.Role.USER,
        },
    });
    console.log(`Users: ${admin.email}, ${user.email}`);
    const resources = [
        { id: 'court-tennis-a', name: 'Tennis Court A', type: 'COURT', capacityType: 'UNIT', isQuantifiable: false, totalCapacity: 1 },
        { id: 'court-tennis-b', name: 'Tennis Court B', type: 'COURT', capacityType: 'UNIT', isQuantifiable: false, totalCapacity: 1 },
        { id: 'court-basketball', name: 'Basketball Court', type: 'COURT', capacityType: 'UNIT', isQuantifiable: false, totalCapacity: 1 },
        { id: 'court-volleyball', name: 'Volleyball Court', type: 'COURT', capacityType: 'UNIT', isQuantifiable: false, totalCapacity: 1 },
        { id: 'court-badminton-a', name: 'Badminton Court A', type: 'COURT', capacityType: 'UNIT', isQuantifiable: false, totalCapacity: 1 },
        { id: 'court-badminton-b', name: 'Badminton Court B', type: 'COURT', capacityType: 'UNIT', isQuantifiable: false, totalCapacity: 1 },
        { id: 'court-squash', name: 'Squash Court', type: 'COURT', capacityType: 'UNIT', isQuantifiable: false, totalCapacity: 1 },
        { id: 'court-football', name: 'Football Pitch', type: 'COURT', capacityType: 'UNIT', isQuantifiable: false, totalCapacity: 1 },
        { id: 'room-gaming', name: 'Gaming Room', type: 'ROOM', capacityType: 'POOL', isQuantifiable: true, totalCapacity: 20 },
        { id: 'room-yoga', name: 'Yoga Studio', type: 'ROOM', capacityType: 'UNIT', isQuantifiable: false, totalCapacity: 1 },
        { id: 'room-dance', name: 'Dance Studio', type: 'ROOM', capacityType: 'UNIT', isQuantifiable: false, totalCapacity: 1 },
        { id: 'room-boxing', name: 'Boxing Room', type: 'ROOM', capacityType: 'UNIT', isQuantifiable: false, totalCapacity: 1 },
        { id: 'room-meeting', name: 'Meeting Room', type: 'ROOM', capacityType: 'UNIT', isQuantifiable: false, totalCapacity: 1 },
        { id: 'room-pool', name: 'Swimming Pool Lane', type: 'ROOM', capacityType: 'POOL', isQuantifiable: true, totalCapacity: 8 },
        { id: 'equip-bikes', name: 'Cycling Bikes', type: 'EQUIPMENT', capacityType: 'POOL', isQuantifiable: true, totalCapacity: 15 },
        { id: 'equip-kayaks', name: 'Kayaks', type: 'EQUIPMENT', capacityType: 'POOL', isQuantifiable: true, totalCapacity: 6 },
        { id: 'equip-yoga-mats', name: 'Yoga Mats', type: 'EQUIPMENT', capacityType: 'POOL', isQuantifiable: true, totalCapacity: 20 },
        { id: 'equip-tennis-rack', name: 'Tennis Rackets', type: 'EQUIPMENT', capacityType: 'POOL', isQuantifiable: true, totalCapacity: 10 },
        { id: 'equip-ski', name: 'Ski Equipment Set', type: 'EQUIPMENT', capacityType: 'POOL', isQuantifiable: true, totalCapacity: 8 },
        { id: 'equip-climbing', name: 'Climbing Gear Set', type: 'EQUIPMENT', capacityType: 'POOL', isQuantifiable: true, totalCapacity: 10 },
    ];
    for (const r of resources) {
        await prisma.resource.upsert({ where: { id: r.id }, update: {}, create: r });
    }
    console.log(`Created ${resources.length} resources`);
    const pricingData = [
        ...['court-tennis-a', 'court-tennis-b'].flatMap(id => [
            { resourceId: id, priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '06:00', endTime: '12:00', hourlyRate: 8, label: 'Weekday Morning' },
            { resourceId: id, priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '12:00', endTime: '18:00', hourlyRate: 12, label: 'Weekday Afternoon' },
            { resourceId: id, priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '18:00', endTime: '23:00', hourlyRate: 18, label: 'Weekday Evening' },
            { resourceId: id, priority: 'WEEKEND', daysOfWeek: [0, 6], startTime: '06:00', endTime: '23:00', hourlyRate: 22, label: 'Weekend Rate' },
            { resourceId: id, priority: 'HOLIDAY', daysOfWeek: [], startTime: '06:00', endTime: '23:00', hourlyRate: 28, label: 'Holiday Rate' },
        ]),
        ...['court-basketball', 'court-volleyball', 'court-football'].flatMap(id => [
            { resourceId: id, priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '06:00', endTime: '12:00', hourlyRate: 10, label: 'Weekday Morning' },
            { resourceId: id, priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '12:00', endTime: '18:00', hourlyRate: 15, label: 'Weekday Afternoon' },
            { resourceId: id, priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '18:00', endTime: '23:00', hourlyRate: 20, label: 'Weekday Evening' },
            { resourceId: id, priority: 'WEEKEND', daysOfWeek: [0, 6], startTime: '06:00', endTime: '23:00', hourlyRate: 25, label: 'Weekend Rate' },
        ]),
        ...['court-badminton-a', 'court-badminton-b', 'court-squash'].flatMap(id => [
            { resourceId: id, priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '06:00', endTime: '12:00', hourlyRate: 6, label: 'Weekday Morning' },
            { resourceId: id, priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '12:00', endTime: '18:00', hourlyRate: 9, label: 'Weekday Afternoon' },
            { resourceId: id, priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '18:00', endTime: '23:00', hourlyRate: 12, label: 'Weekday Evening' },
            { resourceId: id, priority: 'WEEKEND', daysOfWeek: [0, 6], startTime: '06:00', endTime: '23:00', hourlyRate: 15, label: 'Weekend Rate' },
        ]),
        { resourceId: 'room-gaming', priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '06:00', endTime: '12:00', hourlyRate: 2, label: 'Weekday Morning' },
        { resourceId: 'room-gaming', priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '12:00', endTime: '23:00', hourlyRate: 3, label: 'Weekday Peak' },
        { resourceId: 'room-gaming', priority: 'WEEKEND', daysOfWeek: [0, 6], startTime: '06:00', endTime: '23:00', hourlyRate: 4, label: 'Weekend Rate' },
        ...['room-yoga', 'room-dance', 'room-boxing'].flatMap(id => [
            { resourceId: id, priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '06:00', endTime: '12:00', hourlyRate: 15, label: 'Weekday Morning' },
            { resourceId: id, priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '12:00', endTime: '18:00', hourlyRate: 20, label: 'Weekday Afternoon' },
            { resourceId: id, priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '18:00', endTime: '23:00', hourlyRate: 25, label: 'Weekday Evening' },
            { resourceId: id, priority: 'WEEKEND', daysOfWeek: [0, 6], startTime: '06:00', endTime: '23:00', hourlyRate: 30, label: 'Weekend Rate' },
        ]),
        { resourceId: 'room-meeting', priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '06:00', endTime: '12:00', hourlyRate: 20, label: 'Morning' },
        { resourceId: 'room-meeting', priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '12:00', endTime: '18:00', hourlyRate: 30, label: 'Business Hours' },
        { resourceId: 'room-meeting', priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '18:00', endTime: '23:00', hourlyRate: 25, label: 'Evening' },
        { resourceId: 'room-meeting', priority: 'WEEKEND', daysOfWeek: [0, 6], startTime: '06:00', endTime: '23:00', hourlyRate: 35, label: 'Weekend Rate' },
        { resourceId: 'room-pool', priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '06:00', endTime: '12:00', hourlyRate: 5, label: 'Morning' },
        { resourceId: 'room-pool', priority: 'WEEKDAY', daysOfWeek: [1, 2, 3, 4, 5], startTime: '12:00', endTime: '23:00', hourlyRate: 8, label: 'Peak' },
        { resourceId: 'room-pool', priority: 'WEEKEND', daysOfWeek: [0, 6], startTime: '06:00', endTime: '23:00', hourlyRate: 10, label: 'Weekend Rate' },
        { resourceId: 'equip-bikes', priority: 'WEEKDAY', daysOfWeek: [], startTime: '06:00', endTime: '23:00', hourlyRate: 3, label: 'Standard' },
        { resourceId: 'equip-kayaks', priority: 'WEEKDAY', daysOfWeek: [], startTime: '06:00', endTime: '23:00', hourlyRate: 8, label: 'Standard' },
        { resourceId: 'equip-yoga-mats', priority: 'WEEKDAY', daysOfWeek: [], startTime: '06:00', endTime: '23:00', hourlyRate: 1, label: 'Standard' },
        { resourceId: 'equip-tennis-rack', priority: 'WEEKDAY', daysOfWeek: [], startTime: '06:00', endTime: '23:00', hourlyRate: 2, label: 'Standard' },
        { resourceId: 'equip-ski', priority: 'WEEKDAY', daysOfWeek: [], startTime: '06:00', endTime: '23:00', hourlyRate: 10, label: 'Standard' },
        { resourceId: 'equip-climbing', priority: 'WEEKDAY', daysOfWeek: [], startTime: '06:00', endTime: '23:00', hourlyRate: 5, label: 'Standard' },
    ];
    await prisma.pricingRule.createMany({ skipDuplicates: true, data: pricingData });
    console.log(`Created ${pricingData.length} pricing rules`);
    const staffData = [
        { email: 'tennis.coach@platform.com', name: 'Alex Petrosyan', specialty: 'Tennis', availability: { mon: ['08:00-18:00'], wed: ['08:00-18:00'], fri: ['08:00-16:00'] } },
        { email: 'yoga.coach@platform.com', name: 'Maria Sargsyan', specialty: 'Yoga', availability: { mon: ['07:00-13:00'], tue: ['07:00-13:00'], thu: ['07:00-13:00'], sat: ['08:00-12:00'] } },
        { email: 'boxing.coach@platform.com', name: 'Armen Hakobyan', specialty: 'Boxing', availability: { tue: ['10:00-20:00'], thu: ['10:00-20:00'], sat: ['10:00-18:00'] } },
        { email: 'swim.coach@platform.com', name: 'Nare Grigoryan', specialty: 'Swimming', availability: { mon: ['06:00-14:00'], wed: ['06:00-14:00'], fri: ['06:00-14:00'] } },
        { email: 'dance.coach@platform.com', name: 'Lilit Vardanyan', specialty: 'Dance', availability: { tue: ['14:00-21:00'], thu: ['14:00-21:00'], sat: ['12:00-20:00'] } },
    ];
    for (const s of staffData) {
        await prisma.staff.upsert({ where: { email: s.email }, update: {}, create: s });
    }
    console.log(`Created ${staffData.length} staff members`);
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
            status: client_1.BookingStatus.PENDING,
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
//# sourceMappingURL=seed.js.map