export interface IResponse {
    message: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApplicationResponse = (...params: any[]) => IResponse;

export type ApplicationResponses = {
    [key: string]: {
        Success: ApplicationResponse;
        Failure: ApplicationResponse;
    };
};
