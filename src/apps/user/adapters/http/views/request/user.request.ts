import { WithoutId } from "@common/models";
import { Class } from "@common/requests";
import { User } from "@user/models/user.model";

export const UserRequests = {
    getById: null,
    getAll: null,
    create: {
        Required: {
            firstName: String(),
            lastName: String(),
            age: Number(),
            email: String(),
            password: String(),
        },
        Optional: {},
    },
    update: {
        Required: {
            user: Class(User) as WithoutId<User>,
        },
        Optional: {},
    },
    login: {
        Required: {
            email: String(),
            password: String(),
        },
        Optional: {},
    },
};

export type UserCreateRequest = typeof UserRequests.create;
export type UserLoginRequest = typeof UserRequests.login;
