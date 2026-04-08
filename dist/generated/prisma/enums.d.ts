export declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly USER: "USER";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const ResourceType: {
    readonly ROOM: "ROOM";
    readonly EQUIPMENT: "EQUIPMENT";
    readonly COURT: "COURT";
};
export type ResourceType = (typeof ResourceType)[keyof typeof ResourceType];
export declare const ResourceCapacityType: {
    readonly UNIT: "UNIT";
    readonly POOL: "POOL";
};
export type ResourceCapacityType = (typeof ResourceCapacityType)[keyof typeof ResourceCapacityType];
export declare const PricingPriority: {
    readonly WEEKDAY: "WEEKDAY";
    readonly WEEKEND: "WEEKEND";
    readonly HOLIDAY: "HOLIDAY";
};
export type PricingPriority = (typeof PricingPriority)[keyof typeof PricingPriority];
export declare const BookingStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
    readonly PAID: "PAID";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const TransactionType: {
    readonly TOPUP: "TOPUP";
    readonly PAYMENT: "PAYMENT";
    readonly REFUND: "REFUND";
};
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
export declare const TransactionStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type TransactionStatus = (typeof TransactionStatus)[keyof typeof TransactionStatus];
export declare const PaymentMethod: {
    readonly WALLET: "WALLET";
    readonly IDRAM: "IDRAM";
    readonly TELCELL: "TELCELL";
    readonly CASH: "CASH";
    readonly BANK: "BANK";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const NotificationType: {
    readonly INFO: "INFO";
    readonly SUCCESS: "SUCCESS";
    readonly WARNING: "WARNING";
    readonly ERROR: "ERROR";
    readonly BOOKING_CONFIRMED: "BOOKING_CONFIRMED";
    readonly BOOKING_CANCELLED: "BOOKING_CANCELLED";
    readonly BOOKING_APPROVED: "BOOKING_APPROVED";
    readonly BOOKING_REJECTED: "BOOKING_REJECTED";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
