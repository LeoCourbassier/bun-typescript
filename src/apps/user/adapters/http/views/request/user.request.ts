import { WithoutId } from "@commons/models";
import { Class } from "@commons/requests";
import { User } from "@user/models/user.model";

export const UserRequests = {
    getById: null,
    getAll: null,
    create: {
        Required: {
            name: String(),
            email: String(),
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
