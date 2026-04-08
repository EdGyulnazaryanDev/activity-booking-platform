import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type StaffModel = runtime.Types.Result.DefaultSelection<Prisma.$StaffPayload>;
export type AggregateStaff = {
    _count: StaffCountAggregateOutputType | null;
    _min: StaffMinAggregateOutputType | null;
    _max: StaffMaxAggregateOutputType | null;
};
export type StaffMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    specialty: string | null;
    phone: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type StaffMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    email: string | null;
    specialty: string | null;
    phone: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type StaffCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    specialty: number;
    allowedResourceTypes: number;
    availability: number;
    phone: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type StaffMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    specialty?: true;
    phone?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type StaffMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    specialty?: true;
    phone?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type StaffCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    specialty?: true;
    allowedResourceTypes?: true;
    availability?: true;
    phone?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type StaffAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StaffWhereInput;
    orderBy?: Prisma.StaffOrderByWithRelationInput | Prisma.StaffOrderByWithRelationInput[];
    cursor?: Prisma.StaffWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StaffCountAggregateInputType;
    _min?: StaffMinAggregateInputType;
    _max?: StaffMaxAggregateInputType;
};
export type GetStaffAggregateType<T extends StaffAggregateArgs> = {
    [P in keyof T & keyof AggregateStaff]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStaff[P]> : Prisma.GetScalarType<T[P], AggregateStaff[P]>;
};
export type StaffGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StaffWhereInput;
    orderBy?: Prisma.StaffOrderByWithAggregationInput | Prisma.StaffOrderByWithAggregationInput[];
    by: Prisma.StaffScalarFieldEnum[] | Prisma.StaffScalarFieldEnum;
    having?: Prisma.StaffScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StaffCountAggregateInputType | true;
    _min?: StaffMinAggregateInputType;
    _max?: StaffMaxAggregateInputType;
};
export type StaffGroupByOutputType = {
    id: string;
    name: string;
    email: string;
    specialty: string | null;
    allowedResourceTypes: $Enums.ResourceType[];
    availability: runtime.JsonValue | null;
    phone: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: StaffCountAggregateOutputType | null;
    _min: StaffMinAggregateOutputType | null;
    _max: StaffMaxAggregateOutputType | null;
};
export type GetStaffGroupByPayload<T extends StaffGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StaffGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StaffGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StaffGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StaffGroupByOutputType[P]>;
}>>;
export type StaffWhereInput = {
    AND?: Prisma.StaffWhereInput | Prisma.StaffWhereInput[];
    OR?: Prisma.StaffWhereInput[];
    NOT?: Prisma.StaffWhereInput | Prisma.StaffWhereInput[];
    id?: Prisma.StringFilter<"Staff"> | string;
    name?: Prisma.StringFilter<"Staff"> | string;
    email?: Prisma.StringFilter<"Staff"> | string;
    specialty?: Prisma.StringNullableFilter<"Staff"> | string | null;
    allowedResourceTypes?: Prisma.EnumResourceTypeNullableListFilter<"Staff">;
    availability?: Prisma.JsonNullableFilter<"Staff">;
    phone?: Prisma.StringNullableFilter<"Staff"> | string | null;
    isActive?: Prisma.BoolFilter<"Staff"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Staff"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Staff"> | Date | string;
    bookings?: Prisma.BookingListRelationFilter;
};
export type StaffOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    specialty?: Prisma.SortOrderInput | Prisma.SortOrder;
    allowedResourceTypes?: Prisma.SortOrder;
    availability?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
};
export type StaffWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.StaffWhereInput | Prisma.StaffWhereInput[];
    OR?: Prisma.StaffWhereInput[];
    NOT?: Prisma.StaffWhereInput | Prisma.StaffWhereInput[];
    name?: Prisma.StringFilter<"Staff"> | string;
    specialty?: Prisma.StringNullableFilter<"Staff"> | string | null;
    allowedResourceTypes?: Prisma.EnumResourceTypeNullableListFilter<"Staff">;
    availability?: Prisma.JsonNullableFilter<"Staff">;
    phone?: Prisma.StringNullableFilter<"Staff"> | string | null;
    isActive?: Prisma.BoolFilter<"Staff"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Staff"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Staff"> | Date | string;
    bookings?: Prisma.BookingListRelationFilter;
}, "id" | "email">;
export type StaffOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    specialty?: Prisma.SortOrderInput | Prisma.SortOrder;
    allowedResourceTypes?: Prisma.SortOrder;
    availability?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.StaffCountOrderByAggregateInput;
    _max?: Prisma.StaffMaxOrderByAggregateInput;
    _min?: Prisma.StaffMinOrderByAggregateInput;
};
export type StaffScalarWhereWithAggregatesInput = {
    AND?: Prisma.StaffScalarWhereWithAggregatesInput | Prisma.StaffScalarWhereWithAggregatesInput[];
    OR?: Prisma.StaffScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StaffScalarWhereWithAggregatesInput | Prisma.StaffScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Staff"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Staff"> | string;
    email?: Prisma.StringWithAggregatesFilter<"Staff"> | string;
    specialty?: Prisma.StringNullableWithAggregatesFilter<"Staff"> | string | null;
    allowedResourceTypes?: Prisma.EnumResourceTypeNullableListFilter<"Staff">;
    availability?: Prisma.JsonNullableWithAggregatesFilter<"Staff">;
    phone?: Prisma.StringNullableWithAggregatesFilter<"Staff"> | string | null;
    isActive?: Prisma.BoolWithAggregatesFilter<"Staff"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Staff"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Staff"> | Date | string;
};
export type StaffCreateInput = {
    id?: string;
    name: string;
    email: string;
    specialty?: string | null;
    allowedResourceTypes?: Prisma.StaffCreateallowedResourceTypesInput | $Enums.ResourceType[];
    availability?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phone?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingCreateNestedManyWithoutStaffInput;
};
export type StaffUncheckedCreateInput = {
    id?: string;
    name: string;
    email: string;
    specialty?: string | null;
    allowedResourceTypes?: Prisma.StaffCreateallowedResourceTypesInput | $Enums.ResourceType[];
    availability?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phone?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutStaffInput;
};
export type StaffUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    specialty?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    allowedResourceTypes?: Prisma.StaffUpdateallowedResourceTypesInput | $Enums.ResourceType[];
    availability?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUpdateManyWithoutStaffNestedInput;
};
export type StaffUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    specialty?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    allowedResourceTypes?: Prisma.StaffUpdateallowedResourceTypesInput | $Enums.ResourceType[];
    availability?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutStaffNestedInput;
};
export type StaffCreateManyInput = {
    id?: string;
    name: string;
    email: string;
    specialty?: string | null;
    allowedResourceTypes?: Prisma.StaffCreateallowedResourceTypesInput | $Enums.ResourceType[];
    availability?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phone?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StaffUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    specialty?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    allowedResourceTypes?: Prisma.StaffUpdateallowedResourceTypesInput | $Enums.ResourceType[];
    availability?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StaffUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    specialty?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    allowedResourceTypes?: Prisma.StaffUpdateallowedResourceTypesInput | $Enums.ResourceType[];
    availability?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StaffNullableScalarRelationFilter = {
    is?: Prisma.StaffWhereInput | null;
    isNot?: Prisma.StaffWhereInput | null;
};
export type EnumResourceTypeNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.ResourceType[] | Prisma.ListEnumResourceTypeFieldRefInput<$PrismaModel> | null;
    has?: $Enums.ResourceType | Prisma.EnumResourceTypeFieldRefInput<$PrismaModel> | null;
    hasEvery?: $Enums.ResourceType[] | Prisma.ListEnumResourceTypeFieldRefInput<$PrismaModel>;
    hasSome?: $Enums.ResourceType[] | Prisma.ListEnumResourceTypeFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type StaffCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    specialty?: Prisma.SortOrder;
    allowedResourceTypes?: Prisma.SortOrder;
    availability?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StaffMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    specialty?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StaffMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    specialty?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StaffCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.StaffCreateWithoutBookingsInput, Prisma.StaffUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.StaffCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.StaffWhereUniqueInput;
};
export type StaffUpdateOneWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.StaffCreateWithoutBookingsInput, Prisma.StaffUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.StaffCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.StaffUpsertWithoutBookingsInput;
    disconnect?: Prisma.StaffWhereInput | boolean;
    delete?: Prisma.StaffWhereInput | boolean;
    connect?: Prisma.StaffWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StaffUpdateToOneWithWhereWithoutBookingsInput, Prisma.StaffUpdateWithoutBookingsInput>, Prisma.StaffUncheckedUpdateWithoutBookingsInput>;
};
export type StaffCreateallowedResourceTypesInput = {
    set: $Enums.ResourceType[];
};
export type StaffUpdateallowedResourceTypesInput = {
    set?: $Enums.ResourceType[];
    push?: $Enums.ResourceType | $Enums.ResourceType[];
};
export type StaffCreateWithoutBookingsInput = {
    id?: string;
    name: string;
    email: string;
    specialty?: string | null;
    allowedResourceTypes?: Prisma.StaffCreateallowedResourceTypesInput | $Enums.ResourceType[];
    availability?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phone?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StaffUncheckedCreateWithoutBookingsInput = {
    id?: string;
    name: string;
    email: string;
    specialty?: string | null;
    allowedResourceTypes?: Prisma.StaffCreateallowedResourceTypesInput | $Enums.ResourceType[];
    availability?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phone?: string | null;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StaffCreateOrConnectWithoutBookingsInput = {
    where: Prisma.StaffWhereUniqueInput;
    create: Prisma.XOR<Prisma.StaffCreateWithoutBookingsInput, Prisma.StaffUncheckedCreateWithoutBookingsInput>;
};
export type StaffUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.StaffUpdateWithoutBookingsInput, Prisma.StaffUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.StaffCreateWithoutBookingsInput, Prisma.StaffUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.StaffWhereInput;
};
export type StaffUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.StaffWhereInput;
    data: Prisma.XOR<Prisma.StaffUpdateWithoutBookingsInput, Prisma.StaffUncheckedUpdateWithoutBookingsInput>;
};
export type StaffUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    specialty?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    allowedResourceTypes?: Prisma.StaffUpdateallowedResourceTypesInput | $Enums.ResourceType[];
    availability?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StaffUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    specialty?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    allowedResourceTypes?: Prisma.StaffUpdateallowedResourceTypesInput | $Enums.ResourceType[];
    availability?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StaffCountOutputType = {
    bookings: number;
};
export type StaffCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bookings?: boolean | StaffCountOutputTypeCountBookingsArgs;
};
export type StaffCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffCountOutputTypeSelect<ExtArgs> | null;
};
export type StaffCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type StaffSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    specialty?: boolean;
    allowedResourceTypes?: boolean;
    availability?: boolean;
    phone?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    bookings?: boolean | Prisma.Staff$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.StaffCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["staff"]>;
export type StaffSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    specialty?: boolean;
    allowedResourceTypes?: boolean;
    availability?: boolean;
    phone?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["staff"]>;
export type StaffSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    specialty?: boolean;
    allowedResourceTypes?: boolean;
    availability?: boolean;
    phone?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["staff"]>;
export type StaffSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    specialty?: boolean;
    allowedResourceTypes?: boolean;
    availability?: boolean;
    phone?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type StaffOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "email" | "specialty" | "allowedResourceTypes" | "availability" | "phone" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["staff"]>;
export type StaffInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bookings?: boolean | Prisma.Staff$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.StaffCountOutputTypeDefaultArgs<ExtArgs>;
};
export type StaffIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type StaffIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $StaffPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Staff";
    objects: {
        bookings: Prisma.$BookingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        email: string;
        specialty: string | null;
        allowedResourceTypes: $Enums.ResourceType[];
        availability: runtime.JsonValue | null;
        phone: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["staff"]>;
    composites: {};
};
export type StaffGetPayload<S extends boolean | null | undefined | StaffDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StaffPayload, S>;
export type StaffCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StaffFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StaffCountAggregateInputType | true;
};
export interface StaffDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Staff'];
        meta: {
            name: 'Staff';
        };
    };
    findUnique<T extends StaffFindUniqueArgs>(args: Prisma.SelectSubset<T, StaffFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StaffFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StaffFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StaffFindFirstArgs>(args?: Prisma.SelectSubset<T, StaffFindFirstArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StaffFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StaffFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StaffFindManyArgs>(args?: Prisma.SelectSubset<T, StaffFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StaffCreateArgs>(args: Prisma.SelectSubset<T, StaffCreateArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StaffCreateManyArgs>(args?: Prisma.SelectSubset<T, StaffCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StaffCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StaffCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StaffDeleteArgs>(args: Prisma.SelectSubset<T, StaffDeleteArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StaffUpdateArgs>(args: Prisma.SelectSubset<T, StaffUpdateArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StaffDeleteManyArgs>(args?: Prisma.SelectSubset<T, StaffDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StaffUpdateManyArgs>(args: Prisma.SelectSubset<T, StaffUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StaffUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StaffUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StaffUpsertArgs>(args: Prisma.SelectSubset<T, StaffUpsertArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StaffCountArgs>(args?: Prisma.Subset<T, StaffCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StaffCountAggregateOutputType> : number>;
    aggregate<T extends StaffAggregateArgs>(args: Prisma.Subset<T, StaffAggregateArgs>): Prisma.PrismaPromise<GetStaffAggregateType<T>>;
    groupBy<T extends StaffGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StaffGroupByArgs['orderBy'];
    } : {
        orderBy?: StaffGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StaffGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StaffFieldRefs;
}
export interface Prisma__StaffClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    bookings<T extends Prisma.Staff$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Staff$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StaffFieldRefs {
    readonly id: Prisma.FieldRef<"Staff", 'String'>;
    readonly name: Prisma.FieldRef<"Staff", 'String'>;
    readonly email: Prisma.FieldRef<"Staff", 'String'>;
    readonly specialty: Prisma.FieldRef<"Staff", 'String'>;
    readonly allowedResourceTypes: Prisma.FieldRef<"Staff", 'ResourceType[]'>;
    readonly availability: Prisma.FieldRef<"Staff", 'Json'>;
    readonly phone: Prisma.FieldRef<"Staff", 'String'>;
    readonly isActive: Prisma.FieldRef<"Staff", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Staff", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Staff", 'DateTime'>;
}
export type StaffFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    where: Prisma.StaffWhereUniqueInput;
};
export type StaffFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    where: Prisma.StaffWhereUniqueInput;
};
export type StaffFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    where?: Prisma.StaffWhereInput;
    orderBy?: Prisma.StaffOrderByWithRelationInput | Prisma.StaffOrderByWithRelationInput[];
    cursor?: Prisma.StaffWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StaffScalarFieldEnum | Prisma.StaffScalarFieldEnum[];
};
export type StaffFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    where?: Prisma.StaffWhereInput;
    orderBy?: Prisma.StaffOrderByWithRelationInput | Prisma.StaffOrderByWithRelationInput[];
    cursor?: Prisma.StaffWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StaffScalarFieldEnum | Prisma.StaffScalarFieldEnum[];
};
export type StaffFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    where?: Prisma.StaffWhereInput;
    orderBy?: Prisma.StaffOrderByWithRelationInput | Prisma.StaffOrderByWithRelationInput[];
    cursor?: Prisma.StaffWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StaffScalarFieldEnum | Prisma.StaffScalarFieldEnum[];
};
export type StaffCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StaffCreateInput, Prisma.StaffUncheckedCreateInput>;
};
export type StaffCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StaffCreateManyInput | Prisma.StaffCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StaffCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    data: Prisma.StaffCreateManyInput | Prisma.StaffCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StaffUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StaffUpdateInput, Prisma.StaffUncheckedUpdateInput>;
    where: Prisma.StaffWhereUniqueInput;
};
export type StaffUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StaffUpdateManyMutationInput, Prisma.StaffUncheckedUpdateManyInput>;
    where?: Prisma.StaffWhereInput;
    limit?: number;
};
export type StaffUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StaffUpdateManyMutationInput, Prisma.StaffUncheckedUpdateManyInput>;
    where?: Prisma.StaffWhereInput;
    limit?: number;
};
export type StaffUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    where: Prisma.StaffWhereUniqueInput;
    create: Prisma.XOR<Prisma.StaffCreateInput, Prisma.StaffUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StaffUpdateInput, Prisma.StaffUncheckedUpdateInput>;
};
export type StaffDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    where: Prisma.StaffWhereUniqueInput;
};
export type StaffDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StaffWhereInput;
    limit?: number;
};
export type Staff$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
export type StaffDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
};
