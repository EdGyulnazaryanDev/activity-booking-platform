export declare class CreatePricingDto {
    resourceId: string;
    startTime: string;
    endTime: string;
    hourlyRate: number;
    label?: string;
    isActive?: boolean;
}
export declare class UpdatePricingDto {
    startTime?: string;
    endTime?: string;
    hourlyRate?: number;
    label?: string;
    isActive?: boolean;
}
