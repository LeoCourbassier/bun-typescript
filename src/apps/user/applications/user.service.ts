import { Service } from "typedi";
import { ApplicationService } from "common/services";
import { Store } from "common/context";
import { UserRepository } from "@user/repositories/user.repository";
import { User } from "@user/models/user.model";
import { WithoutId } from "@common/models";
import { NotFoundError } from "elysia";

@Service()
export default class UserService extends ApplicationService {
    constructor(private userRepository: UserRepository) {
        super();
    }

    getAll(store: Store): Promise<User[]> {
        const log = this.logger(store);
        log.debug("Getting all users");

        return this.userRepository.find();
    }

    async getById(store: Store, id: string): Promise<User> {
        const log = this.logger(store);
        log.debug(`Getting user by id ${id}`);

        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        return user;
    }

    create(store: Store, user: WithoutId<User>): Promise<User> {
        const log = this.logger(store);
        log.debug(`Creating user ${JSON.stringify(user)}`);

        return this.userRepository.create(user);
    }
}
