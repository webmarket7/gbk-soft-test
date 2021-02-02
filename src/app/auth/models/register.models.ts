export interface RegisterPayload {
    email: string;
    password: string;
}

export interface RegisterResponse {
    token: string;
    expiredAt: number;
}
