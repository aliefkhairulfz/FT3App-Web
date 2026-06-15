export type ErrorResponseData<T> = {
    ok: boolean;
    statusCode: number;
    message: string;
    errors: T;
};

export type SuccessResponseData<T> = {
    ok: boolean;
    statusCode: number;
    message: string;
    data: T;
    meta: Record<string, string>;
};
