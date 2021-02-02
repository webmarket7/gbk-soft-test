export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    expiredAt: number;
}
