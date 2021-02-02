export interface APIResponse {
    code: number;
    status: 'success' | 'error';
    message: string;
    result: unknown | Array<unknown>;
}
