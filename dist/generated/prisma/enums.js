"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.PaymentMethod = exports.TransactionStatus = exports.TransactionType = exports.BookingStatus = exports.PricingPriority = exports.ResourceCapacityType = exports.ResourceType = exports.Role = void 0;
exports.Role = {
    ADMIN: 'ADMIN',
    USER: 'USER'
};
exports.ResourceType = {
    ROOM: 'ROOM',
    EQUIPMENT: 'EQUIPMENT',
    COURT: 'COURT'
};
exports.ResourceCapacityType = {
    UNIT: 'UNIT',
    POOL: 'POOL'
};
exports.PricingPriority = {
    WEEKDAY: 'WEEKDAY',
    WEEKEND: 'WEEKEND',
    HOLIDAY: 'HOLIDAY'
};
exports.BookingStatus = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
    PAID: 'PAID'
};
exports.TransactionType = {
    TOPUP: 'TOPUP',
    PAYMENT: 'PAYMENT',
    REFUND: 'REFUND'
};
exports.TransactionStatus = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED'
};
exports.PaymentMethod = {
    WALLET: 'WALLET',
    IDRAM: 'IDRAM',
    TELCELL: 'TELCELL',
    CASH: 'CASH',
    BANK: 'BANK'
};
exports.NotificationType = {
    INFO: 'INFO',
    SUCCESS: 'SUCCESS',
    WARNING: 'WARNING',
    ERROR: 'ERROR',
    BOOKING_CONFIRMED: 'BOOKING_CONFIRMED',
    BOOKING_CANCELLED: 'BOOKING_CANCELLED',
    BOOKING_APPROVED: 'BOOKING_APPROVED',
    BOOKING_REJECTED: 'BOOKING_REJECTED'
};
//# sourceMappingURL=enums.js.map