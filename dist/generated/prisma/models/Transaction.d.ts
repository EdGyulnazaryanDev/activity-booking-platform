import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type TransactionModel = runtime.Types.Result.DefaultSelection<Prisma.$TransactionPayload>;
export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null;
    _avg: TransactionAvgAggregateOutputType | null;
    _sum: TransactionSumAggregateOutputType | null;
    _min: TransactionMinAggregateOutputType | null;
    _max: TransactionMaxAggregateOutputType | null;
};
export type TransactionAvgAggregateOutputType = {
    amount: number | null;
};
export type TransactionSumAggregateOutputType = {
    amount: number | null;
};
export type TransactionMinAggregateOutputType = {
    id: string | null;
    walletId: string | null;
    type: $Enums.TransactionType | null;
    status: $Enums.TransactionStatus | null;
    amount: number | null;
    description: string | null;
    bookingId: string | null;
    externalRef: string | null;
    createdAt: Date | null;
};
export type TransactionMaxAggregateOutputType = {
    id: string | null;
    walletId: string | null;
    type: $Enums.TransactionType | null;
    status: $Enums.TransactionStatus | null;
    amount: number | null;
    description: string | null;
    bookingId: string | null;
    externalRef: string | null;
    createdAt: Date | null;
};
export type TransactionCountAggregateOutputType = {
    id: number;
    walletId: number;
    type: number;
    status: number;
    amount: number;
    description: number;
    bookingId: number;
    externalRef: number;
    createdAt: number;
    _all: number;
};
export type TransactionAvgAggregateInputType = {
    amount?: true;
};
export type TransactionSumAggregateInputType = {
    amount?: true;
};
export type TransactionMinAggregateInputType = {
    id?: true;
    walletId?: true;
    type?: true;
    status?: true;
    amount?: true;
    description?: true;
    bookingId?: true;
    externalRef?: true;
    createdAt?: true;
};
export type TransactionMaxAggregateInputType = {
    id?: true;
    walletId?: true;
    type?: true;
    status?: true;
    amount?: true;
    description?: true;
    bookingId?: true;
    externalRef?: true;
    createdAt?: true;
};
export type TransactionCountAggregateInputType = {
    id?: true;
    walletId?: true;
    type?: true;
    status?: true;
    amount?: true;
    description?: true;
    bookingId?: true;
    externalRef?: true;
    createdAt?: true;
    _all?: true;
};
export type TransactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput | Prisma.TransactionOrderByWithRelationInput[];
    cursor?: Prisma.TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TransactionCountAggregateInputType;
    _avg?: TransactionAvgAggregateInputType;
    _sum?: TransactionSumAggregateInputType;
    _min?: TransactionMinAggregateInputType;
    _max?: TransactionMaxAggregateInputType;
};
export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
    [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTransaction[P]> : Prisma.GetScalarType<T[P], AggregateTransaction[P]>;
};
export type TransactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithAggregationInput | Prisma.TransactionOrderByWithAggregationInput[];
    by: Prisma.TransactionScalarFieldEnum[] | Prisma.TransactionScalarFieldEnum;
    having?: Prisma.TransactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TransactionCountAggregateInputType | true;
    _avg?: TransactionAvgAggregateInputType;
    _sum?: TransactionSumAggregateInputType;
    _min?: TransactionMinAggregateInputType;
    _max?: TransactionMaxAggregateInputType;
};
export type TransactionGroupByOutputType = {
    id: string;
    walletId: string;
    type: $Enums.TransactionType;
    status: $Enums.TransactionStatus;
    amount: number;
    description: string | null;
    bookingId: string | null;
    externalRef: string | null;
    createdAt: Date;
    _count: TransactionCountAggregateOutputType | null;
    _avg: TransactionAvgAggregateOutputType | null;
    _sum: TransactionSumAggregateOutputType | null;
    _min: TransactionMinAggregateOutputType | null;
    _max: TransactionMaxAggregateOutputType | null;
};
export type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TransactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TransactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TransactionGroupByOutputType[P]>;
}>>;
export type TransactionWhereInput = {
    AND?: Prisma.TransactionWhereInput | Prisma.TransactionWhereInput[];
    OR?: Prisma.TransactionWhereInput[];
    NOT?: Prisma.TransactionWhereInput | Prisma.TransactionWhereInput[];
    id?: Prisma.StringFilter<"Transaction"> | string;
    walletId?: Prisma.StringFilter<"Transaction"> | string;
    type?: Prisma.EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType;
    status?: Prisma.EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus;
    amount?: Prisma.FloatFilter<"Transaction"> | number;
    description?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    bookingId?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    externalRef?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Transaction"> | Date | string;
    wallet?: Prisma.XOR<Prisma.WalletScalarRelationFilter, Prisma.WalletWhereInput>;
};
export type TransactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    bookingId?: Prisma.SortOrderInput | Prisma.SortOrder;
    externalRef?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    wallet?: Prisma.WalletOrderByWithRelationInput;
};
export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TransactionWhereInput | Prisma.TransactionWhereInput[];
    OR?: Prisma.TransactionWhereInput[];
    NOT?: Prisma.TransactionWhereInput | Prisma.TransactionWhereInput[];
    walletId?: Prisma.StringFilter<"Transaction"> | string;
    type?: Prisma.EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType;
    status?: Prisma.EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus;
    amount?: Prisma.FloatFilter<"Transaction"> | number;
    description?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    bookingId?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    externalRef?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Transaction"> | Date | string;
    wallet?: Prisma.XOR<Prisma.WalletScalarRelationFilter, Prisma.WalletWhereInput>;
}, "id">;
export type TransactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    bookingId?: Prisma.SortOrderInput | Prisma.SortOrder;
    externalRef?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TransactionCountOrderByAggregateInput;
    _avg?: Prisma.TransactionAvgOrderByAggregateInput;
    _max?: Prisma.TransactionMaxOrderByAggregateInput;
    _min?: Prisma.TransactionMinOrderByAggregateInput;
    _sum?: Prisma.TransactionSumOrderByAggregateInput;
};
export type TransactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.TransactionScalarWhereWithAggregatesInput | Prisma.TransactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.TransactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TransactionScalarWhereWithAggregatesInput | Prisma.TransactionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Transaction"> | string;
    walletId?: Prisma.StringWithAggregatesFilter<"Transaction"> | string;
    type?: Prisma.EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType;
    status?: Prisma.EnumTransactionStatusWithAggregatesFilter<"Transaction"> | $Enums.TransactionStatus;
    amount?: Prisma.FloatWithAggregatesFilter<"Transaction"> | number;
    description?: Prisma.StringNullableWithAggregatesFilter<"Transaction"> | string | null;
    bookingId?: Prisma.StringNullableWithAggregatesFilter<"Transaction"> | string | null;
    externalRef?: Prisma.StringNullableWithAggregatesFilter<"Transaction"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Transaction"> | Date | string;
};
export type TransactionCreateInput = {
    id?: string;
    type: $Enums.TransactionType;
    status?: $Enums.TransactionStatus;
    amount: number;
    description?: string | null;
    bookingId?: string | null;
    externalRef?: string | null;
    createdAt?: Date | string;
    wallet: Prisma.WalletCreateNestedOneWithoutTransactionsInput;
};
export type TransactionUncheckedCreateInput = {
    id?: string;
    walletId: string;
    type: $Enums.TransactionType;
    status?: $Enums.TransactionStatus;
    amount: number;
    description?: string | null;
    bookingId?: string | null;
    externalRef?: string | null;
    createdAt?: Date | string;
};
export type TransactionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wallet?: Prisma.WalletUpdateOneRequiredWithoutTransactionsNestedInput;
};
export type TransactionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TransactionCreateManyInput = {
    id?: string;
    walletId: string;
    type: $Enums.TransactionType;
    status?: $Enums.TransactionStatus;
    amount: number;
    description?: string | null;
    bookingId?: string | null;
    externalRef?: string | null;
    createdAt?: Date | string;
};
export type TransactionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TransactionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TransactionListRelationFilter = {
    every?: Prisma.TransactionWhereInput;
    some?: Prisma.TransactionWhereInput;
    none?: Prisma.TransactionWhereInput;
};
export type TransactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TransactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    externalRef?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TransactionAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type TransactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    externalRef?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TransactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    externalRef?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TransactionSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type TransactionCreateNestedManyWithoutWalletInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutWalletInput, Prisma.TransactionUncheckedCreateWithoutWalletInput> | Prisma.TransactionCreateWithoutWalletInput[] | Prisma.TransactionUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutWalletInput | Prisma.TransactionCreateOrConnectWithoutWalletInput[];
    createMany?: Prisma.TransactionCreateManyWalletInputEnvelope;
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
};
export type TransactionUncheckedCreateNestedManyWithoutWalletInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutWalletInput, Prisma.TransactionUncheckedCreateWithoutWalletInput> | Prisma.TransactionCreateWithoutWalletInput[] | Prisma.TransactionUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutWalletInput | Prisma.TransactionCreateOrConnectWithoutWalletInput[];
    createMany?: Prisma.TransactionCreateManyWalletInputEnvelope;
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
};
export type TransactionUpdateManyWithoutWalletNestedInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutWalletInput, Prisma.TransactionUncheckedCreateWithoutWalletInput> | Prisma.TransactionCreateWithoutWalletInput[] | Prisma.TransactionUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutWalletInput | Prisma.TransactionCreateOrConnectWithoutWalletInput[];
    upsert?: Prisma.TransactionUpsertWithWhereUniqueWithoutWalletInput | Prisma.TransactionUpsertWithWhereUniqueWithoutWalletInput[];
    createMany?: Prisma.TransactionCreateManyWalletInputEnvelope;
    set?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    disconnect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    delete?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    update?: Prisma.TransactionUpdateWithWhereUniqueWithoutWalletInput | Prisma.TransactionUpdateWithWhereUniqueWithoutWalletInput[];
    updateMany?: Prisma.TransactionUpdateManyWithWhereWithoutWalletInput | Prisma.TransactionUpdateManyWithWhereWithoutWalletInput[];
    deleteMany?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
};
export type TransactionUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: Prisma.XOR<Prisma.TransactionCreateWithoutWalletInput, Prisma.TransactionUncheckedCreateWithoutWalletInput> | Prisma.TransactionCreateWithoutWalletInput[] | Prisma.TransactionUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.TransactionCreateOrConnectWithoutWalletInput | Prisma.TransactionCreateOrConnectWithoutWalletInput[];
    upsert?: Prisma.TransactionUpsertWithWhereUniqueWithoutWalletInput | Prisma.TransactionUpsertWithWhereUniqueWithoutWalletInput[];
    createMany?: Prisma.TransactionCreateManyWalletInputEnvelope;
    set?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    disconnect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    delete?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    connect?: Prisma.TransactionWhereUniqueInput | Prisma.TransactionWhereUniqueInput[];
    update?: Prisma.TransactionUpdateWithWhereUniqueWithoutWalletInput | Prisma.TransactionUpdateWithWhereUniqueWithoutWalletInput[];
    updateMany?: Prisma.TransactionUpdateManyWithWhereWithoutWalletInput | Prisma.TransactionUpdateManyWithWhereWithoutWalletInput[];
    deleteMany?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
};
export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType;
};
export type EnumTransactionStatusFieldUpdateOperationsInput = {
    set?: $Enums.TransactionStatus;
};
export type TransactionCreateWithoutWalletInput = {
    id?: string;
    type: $Enums.TransactionType;
    status?: $Enums.TransactionStatus;
    amount: number;
    description?: string | null;
    bookingId?: string | null;
    externalRef?: string | null;
    createdAt?: Date | string;
};
export type TransactionUncheckedCreateWithoutWalletInput = {
    id?: string;
    type: $Enums.TransactionType;
    status?: $Enums.TransactionStatus;
    amount: number;
    description?: string | null;
    bookingId?: string | null;
    externalRef?: string | null;
    createdAt?: Date | string;
};
export type TransactionCreateOrConnectWithoutWalletInput = {
    where: Prisma.TransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.TransactionCreateWithoutWalletInput, Prisma.TransactionUncheckedCreateWithoutWalletInput>;
};
export type TransactionCreateManyWalletInputEnvelope = {
    data: Prisma.TransactionCreateManyWalletInput | Prisma.TransactionCreateManyWalletInput[];
    skipDuplicates?: boolean;
};
export type TransactionUpsertWithWhereUniqueWithoutWalletInput = {
    where: Prisma.TransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.TransactionUpdateWithoutWalletInput, Prisma.TransactionUncheckedUpdateWithoutWalletInput>;
    create: Prisma.XOR<Prisma.TransactionCreateWithoutWalletInput, Prisma.TransactionUncheckedCreateWithoutWalletInput>;
};
export type TransactionUpdateWithWhereUniqueWithoutWalletInput = {
    where: Prisma.TransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.TransactionUpdateWithoutWalletInput, Prisma.TransactionUncheckedUpdateWithoutWalletInput>;
};
export type TransactionUpdateManyWithWhereWithoutWalletInput = {
    where: Prisma.TransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.TransactionUpdateManyMutationInput, Prisma.TransactionUncheckedUpdateManyWithoutWalletInput>;
};
export type TransactionScalarWhereInput = {
    AND?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
    OR?: Prisma.TransactionScalarWhereInput[];
    NOT?: Prisma.TransactionScalarWhereInput | Prisma.TransactionScalarWhereInput[];
    id?: Prisma.StringFilter<"Transaction"> | string;
    walletId?: Prisma.StringFilter<"Transaction"> | string;
    type?: Prisma.EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType;
    status?: Prisma.EnumTransactionStatusFilter<"Transaction"> | $Enums.TransactionStatus;
    amount?: Prisma.FloatFilter<"Transaction"> | number;
    description?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    bookingId?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    externalRef?: Prisma.StringNullableFilter<"Transaction"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Transaction"> | Date | string;
};
export type TransactionCreateManyWalletInput = {
    id?: string;
    type: $Enums.TransactionType;
    status?: $Enums.TransactionStatus;
    amount: number;
    description?: string | null;
    bookingId?: string | null;
    externalRef?: string | null;
    createdAt?: Date | string;
};
export type TransactionUpdateWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TransactionUncheckedUpdateWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TransactionUncheckedUpdateManyWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    status?: Prisma.EnumTransactionStatusFieldUpdateOperationsInput | $Enums.TransactionStatus;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    externalRef?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TransactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    walletId?: boolean;
    type?: boolean;
    status?: boolean;
    amount?: boolean;
    description?: boolean;
    bookingId?: boolean;
    externalRef?: boolean;
    createdAt?: boolean;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["transaction"]>;
export type TransactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    walletId?: boolean;
    type?: boolean;
    status?: boolean;
    amount?: boolean;
    description?: boolean;
    bookingId?: boolean;
    externalRef?: boolean;
    createdAt?: boolean;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["transaction"]>;
export type TransactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    walletId?: boolean;
    type?: boolean;
    status?: boolean;
    amount?: boolean;
    description?: boolean;
    bookingId?: boolean;
    externalRef?: boolean;
    createdAt?: boolean;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["transaction"]>;
export type TransactionSelectScalar = {
    id?: boolean;
    walletId?: boolean;
    type?: boolean;
    status?: boolean;
    amount?: boolean;
    description?: boolean;
    bookingId?: boolean;
    externalRef?: boolean;
    createdAt?: boolean;
};
export type TransactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "walletId" | "type" | "status" | "amount" | "description" | "bookingId" | "externalRef" | "createdAt", ExtArgs["result"]["transaction"]>;
export type TransactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
};
export type TransactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
};
export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
};
export type $TransactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Transaction";
    objects: {
        wallet: Prisma.$WalletPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        walletId: string;
        type: $Enums.TransactionType;
        status: $Enums.TransactionStatus;
        amount: number;
        description: string | null;
        bookingId: string | null;
        externalRef: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["transaction"]>;
    composites: {};
};
export type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TransactionPayload, S>;
export type TransactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TransactionCountAggregateInputType | true;
};
export interface TransactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Transaction'];
        meta: {
            name: 'Transaction';
        };
    };
    findUnique<T extends TransactionFindUniqueArgs>(args: Prisma.SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TransactionFindFirstArgs>(args?: Prisma.SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TransactionFindManyArgs>(args?: Prisma.SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TransactionCreateArgs>(args: Prisma.SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TransactionCreateManyArgs>(args?: Prisma.SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TransactionDeleteArgs>(args: Prisma.SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TransactionUpdateArgs>(args: Prisma.SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TransactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TransactionUpdateManyArgs>(args: Prisma.SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TransactionUpsertArgs>(args: Prisma.SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma.Prisma__TransactionClient<runtime.Types.Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TransactionCountArgs>(args?: Prisma.Subset<T, TransactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TransactionCountAggregateOutputType> : number>;
    aggregate<T extends TransactionAggregateArgs>(args: Prisma.Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>;
    groupBy<T extends TransactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TransactionGroupByArgs['orderBy'];
    } : {
        orderBy?: TransactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TransactionFieldRefs;
}
export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    wallet<T extends Prisma.WalletDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WalletDefaultArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TransactionFieldRefs {
    readonly id: Prisma.FieldRef<"Transaction", 'String'>;
    readonly walletId: Prisma.FieldRef<"Transaction", 'String'>;
    readonly type: Prisma.FieldRef<"Transaction", 'TransactionType'>;
    readonly status: Prisma.FieldRef<"Transaction", 'TransactionStatus'>;
    readonly amount: Prisma.FieldRef<"Transaction", 'Float'>;
    readonly description: Prisma.FieldRef<"Transaction", 'String'>;
    readonly bookingId: Prisma.FieldRef<"Transaction", 'String'>;
    readonly externalRef: Prisma.FieldRef<"Transaction", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Transaction", 'DateTime'>;
}
export type TransactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where: Prisma.TransactionWhereUniqueInput;
};
export type TransactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where: Prisma.TransactionWhereUniqueInput;
};
export type TransactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput | Prisma.TransactionOrderByWithRelationInput[];
    cursor?: Prisma.TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionScalarFieldEnum | Prisma.TransactionScalarFieldEnum[];
};
export type TransactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput | Prisma.TransactionOrderByWithRelationInput[];
    cursor?: Prisma.TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionScalarFieldEnum | Prisma.TransactionScalarFieldEnum[];
};
export type TransactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where?: Prisma.TransactionWhereInput;
    orderBy?: Prisma.TransactionOrderByWithRelationInput | Prisma.TransactionOrderByWithRelationInput[];
    cursor?: Prisma.TransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TransactionScalarFieldEnum | Prisma.TransactionScalarFieldEnum[];
};
export type TransactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TransactionCreateInput, Prisma.TransactionUncheckedCreateInput>;
};
export type TransactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TransactionCreateManyInput | Prisma.TransactionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TransactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    data: Prisma.TransactionCreateManyInput | Prisma.TransactionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TransactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TransactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TransactionUpdateInput, Prisma.TransactionUncheckedUpdateInput>;
    where: Prisma.TransactionWhereUniqueInput;
};
export type TransactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TransactionUpdateManyMutationInput, Prisma.TransactionUncheckedUpdateManyInput>;
    where?: Prisma.TransactionWhereInput;
    limit?: number;
};
export type TransactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TransactionUpdateManyMutationInput, Prisma.TransactionUncheckedUpdateManyInput>;
    where?: Prisma.TransactionWhereInput;
    limit?: number;
    include?: Prisma.TransactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TransactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where: Prisma.TransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.TransactionCreateInput, Prisma.TransactionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TransactionUpdateInput, Prisma.TransactionUncheckedUpdateInput>;
};
export type TransactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
    where: Prisma.TransactionWhereUniqueInput;
};
export type TransactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TransactionWhereInput;
    limit?: number;
};
export type TransactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TransactionSelect<ExtArgs> | null;
    omit?: Prisma.TransactionOmit<ExtArgs> | null;
    include?: Prisma.TransactionInclude<ExtArgs> | null;
};
