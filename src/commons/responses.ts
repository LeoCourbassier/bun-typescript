export interface IResponse {
    message: string;
}

export type ApplicationResponse = (...params: unknown[]) => IResponse;

export type ApplicationResponses = {
    [key: string]: {
        Success: ApplicationResponse;
        Failure: ApplicationResponse;
    };
};
