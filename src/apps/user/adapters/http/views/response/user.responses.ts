import { ApplicationError } from "@errors/application";
import { User } from "@user/models/user.model";
import { ApplicationResponses } from "@common/responses";
import { snakeize } from "@utils/util";

export const UserResponses: ApplicationResponses = {
    getById: {
        Success: (user: User) => ({
            message: "Success!",
            user: sanitizeUser(user),
        }),
        Failure: (error: ApplicationError) => ({
            message: "Failed to find user!",
            error: error.message,
        }),
    },
    getAll: {
        Success: (users: User[]) => ({
            message: "Success!",
            total: users.length,
            users: users.map(sanitizeUser),
        }),
        Failure: (error: ApplicationError) => ({
            message: "Failed to find users!",
            error: error.message,
        }),
    },
    create: {
        Success: (user: User) => ({
            message: "Success!",
            user: sanitizeUser(user),
        }),
        Failure: (error: ApplicationError) => ({
            message: "Failed to create user!",
            error: error.message,
        }),
    },
    login: {
        Success: (token: string) => ({
            message: "Success!",
            token,
        }),
        Failure: (error: ApplicationError) => ({
            message: "Failed to login!",
            error: error.message,
        }),
    },
    me: {
        Success: (user: User) => ({
            message: "Success!",
            user: sanitizeUser(user),
        }),
        Failure: (error: ApplicationError) => ({
            message: "Failed to get user!",
            error: error.message,
        }),
    },
};

const sanitizeUser = (user: User) =>
    snakeize({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
    });
