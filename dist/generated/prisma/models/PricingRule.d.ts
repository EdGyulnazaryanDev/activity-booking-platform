import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type PricingRuleModel = runtime.Types.Result.DefaultSelection<Prisma.$PricingRulePayload>;
export type AggregatePricingRule = {
    _count: PricingRuleCountAggregateOutputType | null;
    _avg: PricingRuleAvgAggregateOutputType | null;
    _sum: PricingRuleSumAggregateOutputType | null;
    _min: PricingRuleMinAggregateOutputType | null;
    _max: PricingRuleMaxAggregateOutputType | null;
};
export type PricingRuleAvgAggregateOutputType = {
    daysOfWeek: number | null;
    hourlyRate: number | null;
};
export type PricingRuleSumAggregateOutputType = {
    daysOfWeek: number[];
    hourlyRate: number | null;
};
export type PricingRuleMinAggregateOutputType = {
    id: string | null;
    resourceId: string | null;
    label: string | null;
    priority: $Enums.PricingPriority | null;
    startTime: string | null;
    endTime: string | null;
    hourlyRate: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PricingRuleMaxAggregateOutputType = {
    id: string | null;
    resourceId: string | null;
    label: string | null;
    priority: $Enums.PricingPriority | null;
    startTime: string | null;
    endTime: string | null;
    hourlyRate: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PricingRuleCountAggregateOutputType = {
    id: number;
    resourceId: number;
    label: number;
    priority: number;
    daysOfWeek: number;
    startTime: number;
    endTime: number;
    hourlyRate: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PricingRuleAvgAggregateInputType = {
    daysOfWeek?: true;
    hourlyRate?: true;
};
export type PricingRuleSumAggregateInputType = {
    daysOfWeek?: true;
    hourlyRate?: true;
};
export type PricingRuleMinAggregateInputType = {
    id?: true;
    resourceId?: true;
    label?: true;
    priority?: true;
    startTime?: true;
    endTime?: true;
    hourlyRate?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PricingRuleMaxAggregateInputType = {
    id?: true;
    resourceId?: true;
    label?: true;
    priority?: true;
    startTime?: true;
    endTime?: true;
    hourlyRate?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PricingRuleCountAggregateInputType = {
    id?: true;
    resourceId?: true;
    label?: true;
    priority?: true;
    daysOfWeek?: true;
    startTime?: true;
    endTime?: true;
    hourlyRate?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PricingRuleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PricingRuleWhereInput;
    orderBy?: Prisma.PricingRuleOrderByWithRelationInput | Prisma.PricingRuleOrderByWithRelationInput[];
    cursor?: Prisma.PricingRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PricingRuleCountAggregateInputType;
    _avg?: PricingRuleAvgAggregateInputType;
    _sum?: PricingRuleSumAggregateInputType;
    _min?: PricingRuleMinAggregateInputType;
    _max?: PricingRuleMaxAggregateInputType;
};
export type GetPricingRuleAggregateType<T extends PricingRuleAggregateArgs> = {
    [P in keyof T & keyof AggregatePricingRule]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePricingRule[P]> : Prisma.GetScalarType<T[P], AggregatePricingRule[P]>;
};
export type PricingRuleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PricingRuleWhereInput;
    orderBy?: Prisma.PricingRuleOrderByWithAggregationInput | Prisma.PricingRuleOrderByWithAggregationInput[];
    by: Prisma.PricingRuleScalarFieldEnum[] | Prisma.PricingRuleScalarFieldEnum;
    having?: Prisma.PricingRuleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PricingRuleCountAggregateInputType | true;
    _avg?: PricingRuleAvgAggregateInputType;
    _sum?: PricingRuleSumAggregateInputType;
    _min?: PricingRuleMinAggregateInputType;
    _max?: PricingRuleMaxAggregateInputType;
};
export type PricingRuleGroupByOutputType = {
    id: string;
    resourceId: string;
    label: string | null;
    priority: $Enums.PricingPriority;
    daysOfWeek: number[];
    startTime: string;
    endTime: string;
    hourlyRate: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: PricingRuleCountAggregateOutputType | null;
    _avg: PricingRuleAvgAggregateOutputType | null;
    _sum: PricingRuleSumAggregateOutputType | null;
    _min: PricingRuleMinAggregateOutputType | null;
    _max: PricingRuleMaxAggregateOutputType | null;
};
export type GetPricingRuleGroupByPayload<T extends PricingRuleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PricingRuleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PricingRuleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PricingRuleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PricingRuleGroupByOutputType[P]>;
}>>;
export type PricingRuleWhereInput = {
    AND?: Prisma.PricingRuleWhereInput | Prisma.PricingRuleWhereInput[];
    OR?: Prisma.PricingRuleWhereInput[];
    NOT?: Prisma.PricingRuleWhereInput | Prisma.PricingRuleWhereInput[];
    id?: Prisma.StringFilter<"PricingRule"> | string;
    resourceId?: Prisma.StringFilter<"PricingRule"> | string;
    label?: Prisma.StringNullableFilter<"PricingRule"> | string | null;
    priority?: Prisma.EnumPricingPriorityFilter<"PricingRule"> | $Enums.PricingPriority;
    daysOfWeek?: Prisma.IntNullableListFilter<"PricingRule">;
    startTime?: Prisma.StringFilter<"PricingRule"> | string;
    endTime?: Prisma.StringFilter<"PricingRule"> | string;
    hourlyRate?: Prisma.FloatFilter<"PricingRule"> | number;
    isActive?: Prisma.BoolFilter<"PricingRule"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PricingRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PricingRule"> | Date | string;
    resource?: Prisma.XOR<Prisma.ResourceScalarRelationFilter, Prisma.ResourceWhereInput>;
};
export type PricingRuleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    label?: Prisma.SortOrderInput | Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    daysOfWeek?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    hourlyRate?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    resource?: Prisma.ResourceOrderByWithRelationInput;
};
export type PricingRuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PricingRuleWhereInput | Prisma.PricingRuleWhereInput[];
    OR?: Prisma.PricingRuleWhereInput[];
    NOT?: Prisma.PricingRuleWhereInput | Prisma.PricingRuleWhereInput[];
    resourceId?: Prisma.StringFilter<"PricingRule"> | string;
    label?: Prisma.StringNullableFilter<"PricingRule"> | string | null;
    priority?: Prisma.EnumPricingPriorityFilter<"PricingRule"> | $Enums.PricingPriority;
    daysOfWeek?: Prisma.IntNullableListFilter<"PricingRule">;
    startTime?: Prisma.StringFilter<"PricingRule"> | string;
    endTime?: Prisma.StringFilter<"PricingRule"> | string;
    hourlyRate?: Prisma.FloatFilter<"PricingRule"> | number;
    isActive?: Prisma.BoolFilter<"PricingRule"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PricingRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PricingRule"> | Date | string;
    resource?: Prisma.XOR<Prisma.ResourceScalarRelationFilter, Prisma.ResourceWhereInput>;
}, "id">;
export type PricingRuleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    label?: Prisma.SortOrderInput | Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    daysOfWeek?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    hourlyRate?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PricingRuleCountOrderByAggregateInput;
    _avg?: Prisma.PricingRuleAvgOrderByAggregateInput;
    _max?: Prisma.PricingRuleMaxOrderByAggregateInput;
    _min?: Prisma.PricingRuleMinOrderByAggregateInput;
    _sum?: Prisma.PricingRuleSumOrderByAggregateInput;
};
export type PricingRuleScalarWhereWithAggregatesInput = {
    AND?: Prisma.PricingRuleScalarWhereWithAggregatesInput | Prisma.PricingRuleScalarWhereWithAggregatesInput[];
    OR?: Prisma.PricingRuleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PricingRuleScalarWhereWithAggregatesInput | Prisma.PricingRuleScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PricingRule"> | string;
    resourceId?: Prisma.StringWithAggregatesFilter<"PricingRule"> | string;
    label?: Prisma.StringNullableWithAggregatesFilter<"PricingRule"> | string | null;
    priority?: Prisma.EnumPricingPriorityWithAggregatesFilter<"PricingRule"> | $Enums.PricingPriority;
    daysOfWeek?: Prisma.IntNullableListFilter<"PricingRule">;
    startTime?: Prisma.StringWithAggregatesFilter<"PricingRule"> | string;
    endTime?: Prisma.StringWithAggregatesFilter<"PricingRule"> | string;
    hourlyRate?: Prisma.FloatWithAggregatesFilter<"PricingRule"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"PricingRule"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PricingRule"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PricingRule"> | Date | string;
};
export type PricingRuleCreateInput = {
    id?: string;
    label?: string | null;
    priority?: $Enums.PricingPriority;
    daysOfWeek?: Prisma.PricingRuleCreatedaysOfWeekInput | number[];
    startTime: string;
    endTime: string;
    hourlyRate: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    resource: Prisma.ResourceCreateNestedOneWithoutPricingRulesInput;
};
export type PricingRuleUncheckedCreateInput = {
    id?: string;
    resourceId: string;
    label?: string | null;
    priority?: $Enums.PricingPriority;
    daysOfWeek?: Prisma.PricingRuleCreatedaysOfWeekInput | number[];
    startTime: string;
    endTime: string;
    hourlyRate: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PricingRuleUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.EnumPricingPriorityFieldUpdateOperationsInput | $Enums.PricingPriority;
    daysOfWeek?: Prisma.PricingRuleUpdatedaysOfWeekInput | number[];
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    hourlyRate?: Prisma.FloatFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resource?: Prisma.ResourceUpdateOneRequiredWithoutPricingRulesNestedInput;
};
export type PricingRuleUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.EnumPricingPriorityFieldUpdateOperationsInput | $Enums.PricingPriority;
    daysOfWeek?: Prisma.PricingRuleUpdatedaysOfWeekInput | number[];
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    hourlyRate?: Prisma.FloatFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PricingRuleCreateManyInput = {
    id?: string;
    resourceId: string;
    label?: string | null;
    priority?: $Enums.PricingPriority;
    daysOfWeek?: Prisma.PricingRuleCreatedaysOfWeekInput | number[];
    startTime: string;
    endTime: string;
    hourlyRate: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PricingRuleUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.EnumPricingPriorityFieldUpdateOperationsInput | $Enums.PricingPriority;
    daysOfWeek?: Prisma.PricingRuleUpdatedaysOfWeekInput | number[];
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    hourlyRate?: Prisma.FloatFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PricingRuleUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    resourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.EnumPricingPriorityFieldUpdateOperationsInput | $Enums.PricingPriority;
    daysOfWeek?: Prisma.PricingRuleUpdatedaysOfWeekInput | number[];
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    hourlyRate?: Prisma.FloatFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PricingRuleListRelationFilter = {
    every?: Prisma.PricingRuleWhereInput;
    some?: Prisma.PricingRuleWhereInput;
    none?: Prisma.PricingRuleWhereInput;
};
export type PricingRuleOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    has?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    hasEvery?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    hasSome?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type PricingRuleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    daysOfWeek?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    hourlyRate?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PricingRuleAvgOrderByAggregateInput = {
    daysOfWeek?: Prisma.SortOrder;
    hourlyRate?: Prisma.SortOrder;
};
export type PricingRuleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    hourlyRate?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PricingRuleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    resourceId?: Prisma.SortOrder;
    label?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    hourlyRate?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PricingRuleSumOrderByAggregateInput = {
    daysOfWeek?: Prisma.SortOrder;
    hourlyRate?: Prisma.SortOrder;
};
export type PricingRuleCreateNestedManyWithoutResourceInput = {
    create?: Prisma.XOR<Prisma.PricingRuleCreateWithoutResourceInput, Prisma.PricingRuleUncheckedCreateWithoutResourceInput> | Prisma.PricingRuleCreateWithoutResourceInput[] | Prisma.PricingRuleUncheckedCreateWithoutResourceInput[];
    connectOrCreate?: Prisma.PricingRuleCreateOrConnectWithoutResourceInput | Prisma.PricingRuleCreateOrConnectWithoutResourceInput[];
    createMany?: Prisma.PricingRuleCreateManyResourceInputEnvelope;
    connect?: Prisma.PricingRuleWhereUniqueInput | Prisma.PricingRuleWhereUniqueInput[];
};
export type PricingRuleUncheckedCreateNestedManyWithoutResourceInput = {
    create?: Prisma.XOR<Prisma.PricingRuleCreateWithoutResourceInput, Prisma.PricingRuleUncheckedCreateWithoutResourceInput> | Prisma.PricingRuleCreateWithoutResourceInput[] | Prisma.PricingRuleUncheckedCreateWithoutResourceInput[];
    connectOrCreate?: Prisma.PricingRuleCreateOrConnectWithoutResourceInput | Prisma.PricingRuleCreateOrConnectWithoutResourceInput[];
    createMany?: Prisma.PricingRuleCreateManyResourceInputEnvelope;
    connect?: Prisma.PricingRuleWhereUniqueInput | Prisma.PricingRuleWhereUniqueInput[];
};
export type PricingRuleUpdateManyWithoutResourceNestedInput = {
    create?: Prisma.XOR<Prisma.PricingRuleCreateWithoutResourceInput, Prisma.PricingRuleUncheckedCreateWithoutResourceInput> | Prisma.PricingRuleCreateWithoutResourceInput[] | Prisma.PricingRuleUncheckedCreateWithoutResourceInput[];
    connectOrCreate?: Prisma.PricingRuleCreateOrConnectWithoutResourceInput | Prisma.PricingRuleCreateOrConnectWithoutResourceInput[];
    upsert?: Prisma.PricingRuleUpsertWithWhereUniqueWithoutResourceInput | Prisma.PricingRuleUpsertWithWhereUniqueWithoutResourceInput[];
    createMany?: Prisma.PricingRuleCreateManyResourceInputEnvelope;
    set?: Prisma.PricingRuleWhereUniqueInput | Prisma.PricingRuleWhereUniqueInput[];
    disconnect?: Prisma.PricingRuleWhereUniqueInput | Prisma.PricingRuleWhereUniqueInput[];
    delete?: Prisma.PricingRuleWhereUniqueInput | Prisma.PricingRuleWhereUniqueInput[];
    connect?: Prisma.PricingRuleWhereUniqueInput | Prisma.PricingRuleWhereUniqueInput[];
    update?: Prisma.PricingRuleUpdateWithWhereUniqueWithoutResourceInput | Prisma.PricingRuleUpdateWithWhereUniqueWithoutResourceInput[];
    updateMany?: Prisma.PricingRuleUpdateManyWithWhereWithoutResourceInput | Prisma.PricingRuleUpdateManyWithWhereWithoutResourceInput[];
    deleteMany?: Prisma.PricingRuleScalarWhereInput | Prisma.PricingRuleScalarWhereInput[];
};
export type PricingRuleUncheckedUpdateManyWithoutResourceNestedInput = {
    create?: Prisma.XOR<Prisma.PricingRuleCreateWithoutResourceInput, Prisma.PricingRuleUncheckedCreateWithoutResourceInput> | Prisma.PricingRuleCreateWithoutResourceInput[] | Prisma.PricingRuleUncheckedCreateWithoutResourceInput[];
    connectOrCreate?: Prisma.PricingRuleCreateOrConnectWithoutResourceInput | Prisma.PricingRuleCreateOrConnectWithoutResourceInput[];
    upsert?: Prisma.PricingRuleUpsertWithWhereUniqueWithoutResourceInput | Prisma.PricingRuleUpsertWithWhereUniqueWithoutResourceInput[];
    createMany?: Prisma.PricingRuleCreateManyResourceInputEnvelope;
    set?: Prisma.PricingRuleWhereUniqueInput | Prisma.PricingRuleWhereUniqueInput[];
    disconnect?: Prisma.PricingRuleWhereUniqueInput | Prisma.PricingRuleWhereUniqueInput[];
    delete?: Prisma.PricingRuleWhereUniqueInput | Prisma.PricingRuleWhereUniqueInput[];
    connect?: Prisma.PricingRuleWhereUniqueInput | Prisma.PricingRuleWhereUniqueInput[];
    update?: Prisma.PricingRuleUpdateWithWhereUniqueWithoutResourceInput | Prisma.PricingRuleUpdateWithWhereUniqueWithoutResourceInput[];
    updateMany?: Prisma.PricingRuleUpdateManyWithWhereWithoutResourceInput | Prisma.PricingRuleUpdateManyWithWhereWithoutResourceInput[];
    deleteMany?: Prisma.PricingRuleScalarWhereInput | Prisma.PricingRuleScalarWhereInput[];
};
export type PricingRuleCreatedaysOfWeekInput = {
    set: number[];
};
export type EnumPricingPriorityFieldUpdateOperationsInput = {
    set?: $Enums.PricingPriority;
};
export type PricingRuleUpdatedaysOfWeekInput = {
    set?: number[];
    push?: number | number[];
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type PricingRuleCreateWithoutResourceInput = {
    id?: string;
    label?: string | null;
    priority?: $Enums.PricingPriority;
    daysOfWeek?: Prisma.PricingRuleCreatedaysOfWeekInput | number[];
    startTime: string;
    endTime: string;
    hourlyRate: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PricingRuleUncheckedCreateWithoutResourceInput = {
    id?: string;
    label?: string | null;
    priority?: $Enums.PricingPriority;
    daysOfWeek?: Prisma.PricingRuleCreatedaysOfWeekInput | number[];
    startTime: string;
    endTime: string;
    hourlyRate: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PricingRuleCreateOrConnectWithoutResourceInput = {
    where: Prisma.PricingRuleWhereUniqueInput;
    create: Prisma.XOR<Prisma.PricingRuleCreateWithoutResourceInput, Prisma.PricingRuleUncheckedCreateWithoutResourceInput>;
};
export type PricingRuleCreateManyResourceInputEnvelope = {
    data: Prisma.PricingRuleCreateManyResourceInput | Prisma.PricingRuleCreateManyResourceInput[];
    skipDuplicates?: boolean;
};
export type PricingRuleUpsertWithWhereUniqueWithoutResourceInput = {
    where: Prisma.PricingRuleWhereUniqueInput;
    update: Prisma.XOR<Prisma.PricingRuleUpdateWithoutResourceInput, Prisma.PricingRuleUncheckedUpdateWithoutResourceInput>;
    create: Prisma.XOR<Prisma.PricingRuleCreateWithoutResourceInput, Prisma.PricingRuleUncheckedCreateWithoutResourceInput>;
};
export type PricingRuleUpdateWithWhereUniqueWithoutResourceInput = {
    where: Prisma.PricingRuleWhereUniqueInput;
    data: Prisma.XOR<Prisma.PricingRuleUpdateWithoutResourceInput, Prisma.PricingRuleUncheckedUpdateWithoutResourceInput>;
};
export type PricingRuleUpdateManyWithWhereWithoutResourceInput = {
    where: Prisma.PricingRuleScalarWhereInput;
    data: Prisma.XOR<Prisma.PricingRuleUpdateManyMutationInput, Prisma.PricingRuleUncheckedUpdateManyWithoutResourceInput>;
};
export type PricingRuleScalarWhereInput = {
    AND?: Prisma.PricingRuleScalarWhereInput | Prisma.PricingRuleScalarWhereInput[];
    OR?: Prisma.PricingRuleScalarWhereInput[];
    NOT?: Prisma.PricingRuleScalarWhereInput | Prisma.PricingRuleScalarWhereInput[];
    id?: Prisma.StringFilter<"PricingRule"> | string;
    resourceId?: Prisma.StringFilter<"PricingRule"> | string;
    label?: Prisma.StringNullableFilter<"PricingRule"> | string | null;
    priority?: Prisma.EnumPricingPriorityFilter<"PricingRule"> | $Enums.PricingPriority;
    daysOfWeek?: Prisma.IntNullableListFilter<"PricingRule">;
    startTime?: Prisma.StringFilter<"PricingRule"> | string;
    endTime?: Prisma.StringFilter<"PricingRule"> | string;
    hourlyRate?: Prisma.FloatFilter<"PricingRule"> | number;
    isActive?: Prisma.BoolFilter<"PricingRule"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PricingRule"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PricingRule"> | Date | string;
};
export type PricingRuleCreateManyResourceInput = {
    id?: string;
    label?: string | null;
    priority?: $Enums.PricingPriority;
    daysOfWeek?: Prisma.PricingRuleCreatedaysOfWeekInput | number[];
    startTime: string;
    endTime: string;
    hourlyRate: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PricingRuleUpdateWithoutResourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.EnumPricingPriorityFieldUpdateOperationsInput | $Enums.PricingPriority;
    daysOfWeek?: Prisma.PricingRuleUpdatedaysOfWeekInput | number[];
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    hourlyRate?: Prisma.FloatFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PricingRuleUncheckedUpdateWithoutResourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.EnumPricingPriorityFieldUpdateOperationsInput | $Enums.PricingPriority;
    daysOfWeek?: Prisma.PricingRuleUpdatedaysOfWeekInput | number[];
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    hourlyRate?: Prisma.FloatFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PricingRuleUncheckedUpdateManyWithoutResourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    label?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    priority?: Prisma.EnumPricingPriorityFieldUpdateOperationsInput | $Enums.PricingPriority;
    daysOfWeek?: Prisma.PricingRuleUpdatedaysOfWeekInput | number[];
    startTime?: Prisma.StringFieldUpdateOperationsInput | string;
    endTime?: Prisma.StringFieldUpdateOperationsInput | string;
    hourlyRate?: Prisma.FloatFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PricingRuleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    resourceId?: boolean;
    label?: boolean;
    priority?: boolean;
    daysOfWeek?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    hourlyRate?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    resource?: boolean | Prisma.ResourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pricingRule"]>;
export type PricingRuleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    resourceId?: boolean;
    label?: boolean;
    priority?: boolean;
    daysOfWeek?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    hourlyRate?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    resource?: boolean | Prisma.ResourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pricingRule"]>;
export type PricingRuleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    resourceId?: boolean;
    label?: boolean;
    priority?: boolean;
    daysOfWeek?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    hourlyRate?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    resource?: boolean | Prisma.ResourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pricingRule"]>;
export type PricingRuleSelectScalar = {
    id?: boolean;
    resourceId?: boolean;
    label?: boolean;
    priority?: boolean;
    daysOfWeek?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    hourlyRate?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PricingRuleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "resourceId" | "label" | "priority" | "daysOfWeek" | "startTime" | "endTime" | "hourlyRate" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["pricingRule"]>;
export type PricingRuleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    resource?: boolean | Prisma.ResourceDefaultArgs<ExtArgs>;
};
export type PricingRuleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    resource?: boolean | Prisma.ResourceDefaultArgs<ExtArgs>;
};
export type PricingRuleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    resource?: boolean | Prisma.ResourceDefaultArgs<ExtArgs>;
};
export type $PricingRulePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PricingRule";
    objects: {
        resource: Prisma.$ResourcePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        resourceId: string;
        label: string | null;
        priority: $Enums.PricingPriority;
        daysOfWeek: number[];
        startTime: string;
        endTime: string;
        hourlyRate: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["pricingRule"]>;
    composites: {};
};
export type PricingRuleGetPayload<S extends boolean | null | undefined | PricingRuleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PricingRulePayload, S>;
export type PricingRuleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PricingRuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PricingRuleCountAggregateInputType | true;
};
export interface PricingRuleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PricingRule'];
        meta: {
            name: 'PricingRule';
        };
    };
    findUnique<T extends PricingRuleFindUniqueArgs>(args: Prisma.SelectSubset<T, PricingRuleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PricingRuleClient<runtime.Types.Result.GetResult<Prisma.$PricingRulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PricingRuleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PricingRuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PricingRuleClient<runtime.Types.Result.GetResult<Prisma.$PricingRulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PricingRuleFindFirstArgs>(args?: Prisma.SelectSubset<T, PricingRuleFindFirstArgs<ExtArgs>>): Prisma.Prisma__PricingRuleClient<runtime.Types.Result.GetResult<Prisma.$PricingRulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PricingRuleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PricingRuleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PricingRuleClient<runtime.Types.Result.GetResult<Prisma.$PricingRulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PricingRuleFindManyArgs>(args?: Prisma.SelectSubset<T, PricingRuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PricingRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PricingRuleCreateArgs>(args: Prisma.SelectSubset<T, PricingRuleCreateArgs<ExtArgs>>): Prisma.Prisma__PricingRuleClient<runtime.Types.Result.GetResult<Prisma.$PricingRulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PricingRuleCreateManyArgs>(args?: Prisma.SelectSubset<T, PricingRuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PricingRuleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PricingRuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PricingRulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PricingRuleDeleteArgs>(args: Prisma.SelectSubset<T, PricingRuleDeleteArgs<ExtArgs>>): Prisma.Prisma__PricingRuleClient<runtime.Types.Result.GetResult<Prisma.$PricingRulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PricingRuleUpdateArgs>(args: Prisma.SelectSubset<T, PricingRuleUpdateArgs<ExtArgs>>): Prisma.Prisma__PricingRuleClient<runtime.Types.Result.GetResult<Prisma.$PricingRulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PricingRuleDeleteManyArgs>(args?: Prisma.SelectSubset<T, PricingRuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PricingRuleUpdateManyArgs>(args: Prisma.SelectSubset<T, PricingRuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PricingRuleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PricingRuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PricingRulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PricingRuleUpsertArgs>(args: Prisma.SelectSubset<T, PricingRuleUpsertArgs<ExtArgs>>): Prisma.Prisma__PricingRuleClient<runtime.Types.Result.GetResult<Prisma.$PricingRulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PricingRuleCountArgs>(args?: Prisma.Subset<T, PricingRuleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PricingRuleCountAggregateOutputType> : number>;
    aggregate<T extends PricingRuleAggregateArgs>(args: Prisma.Subset<T, PricingRuleAggregateArgs>): Prisma.PrismaPromise<GetPricingRuleAggregateType<T>>;
    groupBy<T extends PricingRuleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PricingRuleGroupByArgs['orderBy'];
    } : {
        orderBy?: PricingRuleGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PricingRuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPricingRuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PricingRuleFieldRefs;
}
export interface Prisma__PricingRuleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    resource<T extends Prisma.ResourceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ResourceDefaultArgs<ExtArgs>>): Prisma.Prisma__ResourceClient<runtime.Types.Result.GetResult<Prisma.$ResourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PricingRuleFieldRefs {
    readonly id: Prisma.FieldRef<"PricingRule", 'String'>;
    readonly resourceId: Prisma.FieldRef<"PricingRule", 'String'>;
    readonly label: Prisma.FieldRef<"PricingRule", 'String'>;
    readonly priority: Prisma.FieldRef<"PricingRule", 'PricingPriority'>;
    readonly daysOfWeek: Prisma.FieldRef<"PricingRule", 'Int[]'>;
    readonly startTime: Prisma.FieldRef<"PricingRule", 'String'>;
    readonly endTime: Prisma.FieldRef<"PricingRule", 'String'>;
    readonly hourlyRate: Prisma.FieldRef<"PricingRule", 'Float'>;
    readonly isActive: Prisma.FieldRef<"PricingRule", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"PricingRule", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PricingRule", 'DateTime'>;
}
export type PricingRuleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PricingRuleSelect<ExtArgs> | null;
    omit?: Prisma.PricingRuleOmit<ExtArgs> | null;
    include?: Prisma.PricingRuleInclude<ExtArgs> | null;
    where: Prisma.PricingRuleWhereUniqueInput;
};
export type PricingRuleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PricingRuleSelect<ExtArgs> | null;
    omit?: Prisma.PricingRuleOmit<ExtArgs> | null;
    include?: Prisma.PricingRuleInclude<ExtArgs> | null;
    where: Prisma.PricingRuleWhereUniqueInput;
};
export type PricingRuleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PricingRuleSelect<ExtArgs> | null;
    omit?: Prisma.PricingRuleOmit<ExtArgs> | null;
    include?: Prisma.PricingRuleInclude<ExtArgs> | null;
    where?: Prisma.PricingRuleWhereInput;
    orderBy?: Prisma.PricingRuleOrderByWithRelationInput | Prisma.PricingRuleOrderByWithRelationInput[];
    cursor?: Prisma.PricingRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PricingRuleScalarFieldEnum | Prisma.PricingRuleScalarFieldEnum[];
};
export type PricingRuleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PricingRuleSelect<ExtArgs> | null;
    omit?: Prisma.PricingRuleOmit<ExtArgs> | null;
    include?: Prisma.PricingRuleInclude<ExtArgs> | null;
    where?: Prisma.PricingRuleWhereInput;
    orderBy?: Prisma.PricingRuleOrderByWithRelationInput | Prisma.PricingRuleOrderByWithRelationInput[];
    cursor?: Prisma.PricingRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PricingRuleScalarFieldEnum | Prisma.PricingRuleScalarFieldEnum[];
};
export type PricingRuleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PricingRuleSelect<ExtArgs> | null;
    omit?: Prisma.PricingRuleOmit<ExtArgs> | null;
    include?: Prisma.PricingRuleInclude<ExtArgs> | null;
    where?: Prisma.PricingRuleWhereInput;
    orderBy?: Prisma.PricingRuleOrderByWithRelationInput | Prisma.PricingRuleOrderByWithRelationInput[];
    cursor?: Prisma.PricingRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PricingRuleScalarFieldEnum | Prisma.PricingRuleScalarFieldEnum[];
};
export type PricingRuleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PricingRuleSelect<ExtArgs> | null;
    omit?: Prisma.PricingRuleOmit<ExtArgs> | null;
    include?: Prisma.PricingRuleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PricingRuleCreateInput, Prisma.PricingRuleUncheckedCreateInput>;
};
export type PricingRuleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PricingRuleCreateManyInput | Prisma.PricingRuleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PricingRuleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PricingRuleSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PricingRuleOmit<ExtArgs> | null;
    data: Prisma.PricingRuleCreateManyInput | Prisma.PricingRuleCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PricingRuleIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PricingRuleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PricingRuleSelect<ExtArgs> | null;
    omit?: Prisma.PricingRuleOmit<ExtArgs> | null;
    include?: Prisma.PricingRuleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PricingRuleUpdateInput, Prisma.PricingRuleUncheckedUpdateInput>;
    where: Prisma.PricingRuleWhereUniqueInput;
};
export type PricingRuleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PricingRuleUpdateManyMutationInput, Prisma.PricingRuleUncheckedUpdateManyInput>;
    where?: Prisma.PricingRuleWhereInput;
    limit?: number;
};
export type PricingRuleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PricingRuleSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PricingRuleOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PricingRuleUpdateManyMutationInput, Prisma.PricingRuleUncheckedUpdateManyInput>;
    where?: Prisma.PricingRuleWhereInput;
    limit?: number;
    include?: Prisma.PricingRuleIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PricingRuleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PricingRuleSelect<ExtArgs> | null;
    omit?: Prisma.PricingRuleOmit<ExtArgs> | null;
    include?: Prisma.PricingRuleInclude<ExtArgs> | null;
    where: Prisma.PricingRuleWhereUniqueInput;
    create: Prisma.XOR<Prisma.PricingRuleCreateInput, Prisma.PricingRuleUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PricingRuleUpdateInput, Prisma.PricingRuleUncheckedUpdateInput>;
};
export type PricingRuleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PricingRuleSelect<ExtArgs> | null;
    omit?: Prisma.PricingRuleOmit<ExtArgs> | null;
    include?: Prisma.PricingRuleInclude<ExtArgs> | null;
    where: Prisma.PricingRuleWhereUniqueInput;
};
export type PricingRuleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PricingRuleWhereInput;
    limit?: number;
};
export type PricingRuleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PricingRuleSelect<ExtArgs> | null;
    omit?: Prisma.PricingRuleOmit<ExtArgs> | null;
    include?: Prisma.PricingRuleInclude<ExtArgs> | null;
};
