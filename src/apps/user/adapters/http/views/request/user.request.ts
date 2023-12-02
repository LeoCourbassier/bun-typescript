import { WithoutId } from "common/models";
import { Class } from "common/requests";
import { User } from "@user/models/user.model";

export const UserRequests = {
    getById: null,
    getAll: null,
    create: {
        Required: {
            firstName: String(),
            lastName: String(),
            age: Number(),
        },
        Optional: {
            idk: Boolean(),
        },
    },
    update: {
        Required: {
            user: Class(User) as WithoutId<User>,
        },
        Optional: {},
    },
};

export type UserCreateRequest = typeof UserRequests.create;
export type UserUpdateRequest = typeof UserRequests.update;
export type UserGetByIdRequest = typeof UserRequests.getById;
export type UserGetAllRequest = typeof UserRequests.getAll;
