import { ApplicationResponses } from "@commons/responses";

export const HealthResponses: ApplicationResponses = {
    GetHealth: {
        Success: () => ({
            message: "Hello World!",
        }),
        Failure: () => ({
            message: "Hello World!",
        }),
    },
};
