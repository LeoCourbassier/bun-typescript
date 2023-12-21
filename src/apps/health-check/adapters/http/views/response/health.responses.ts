import { ApplicationResponses } from "@common/responses";

export const HealthResponses: ApplicationResponses = {
    getHealth: {
        Success: () => ({
            message: "Hello World!",
        }),
        Failure: () => ({
            message: "Hello World!",
        }),
    },
};
