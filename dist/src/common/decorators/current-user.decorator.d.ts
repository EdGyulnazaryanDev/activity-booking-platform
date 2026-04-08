export interface CurrentUserPayload {
    id: string;
    email: string;
    name?: string;
    role: 'USER' | 'ADMIN';
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
