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
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.SortOrder = exports.NotificationScalarFieldEnum = exports.StaffScalarFieldEnum = exports.TransactionScalarFieldEnum = exports.WalletScalarFieldEnum = exports.BookingScalarFieldEnum = exports.PricingRuleScalarFieldEnum = exports.ResourceScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.7.0",
    engine: "75cbdc1eb7150937890ad5465d861175c6624711"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Resource: 'Resource',
    PricingRule: 'PricingRule',
    Booking: 'Booking',
    Wallet: 'Wallet',
    Transaction: 'Transaction',
    Staff: 'Staff',
    Notification: 'Notification'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.ResourceScalarFieldEnum = {
    id: 'id',
    name: 'name',
    type: 'type',
    capacityType: 'capacityType',
    isQuantifiable: 'isQuantifiable',
    totalCapacity: 'totalCapacity',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PricingRuleScalarFieldEnum = {
    id: 'id',
    resourceId: 'resourceId',
    label: 'label',
    priority: 'priority',
    daysOfWeek: 'daysOfWeek',
    startTime: 'startTime',
    endTime: 'endTime',
    hourlyRate: 'hourlyRate',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.BookingScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    resourceId: 'resourceId',
    staffId: 'staffId',
    partnerOfBookingId: 'partnerOfBookingId',
    quantity: 'quantity',
    startTime: 'startTime',
    endTime: 'endTime',
    status: 'status',
    totalPrice: 'totalPrice',
    paymentMethod: 'paymentMethod',
    paidAt: 'paidAt',
    notes: 'notes',
    isOpenForPartners: 'isOpenForPartners',
    softHoldKey: 'softHoldKey',
    approvedBy: 'approvedBy',
    approvedAt: 'approvedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.WalletScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    balance: 'balance',
    currency: 'currency',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.TransactionScalarFieldEnum = {
    id: 'id',
    walletId: 'walletId',
    type: 'type',
    status: 'status',
    amount: 'amount',
    description: 'description',
    bookingId: 'bookingId',
    externalRef: 'externalRef',
    createdAt: 'createdAt'
};
exports.StaffScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    specialty: 'specialty',
    allowedResourceTypes: 'allowedResourceTypes',
    availability: 'availability',
    phone: 'phone',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message',
    type: 'type',
    isRead: 'isRead',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map