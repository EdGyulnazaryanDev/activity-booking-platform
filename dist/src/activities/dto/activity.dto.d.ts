export declare class CreateActivityDto {
    title: string;
    description?: string;
    location: string;
    capacity: number;
    price: number;
    duration: number;
    category: string;
    imageUrl?: string;
    isActive?: boolean;
}
export declare class UpdateActivityDto {
    title?: string;
    description?: string;
    location?: string;
    capacity?: number;
    price?: number;
    duration?: number;
    category?: string;
    imageUrl?: string;
    isActive?: boolean;
}
