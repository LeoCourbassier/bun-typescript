import { Service } from "typedi";
import { ApplicationService } from "@commons/services";
import { Store } from "@commons/context";
import { UserRepository } from "@user/repositories/user.repository";
import { User } from "@user/models/user.model";
import { WithoutId } from "typeorm";

@Service()
export default class UserService extends ApplicationService {
    constructor(private userRepository: UserRepository) {
        super();
    }

    getAll = (store: Store) => {
        const log = this.getScoppedLogger(store);
        log.info("Get all users");

        return this.userRepository.find();
    };

    getById = (store: Store, id: string) => {
        const log = this.getScoppedLogger(store);
        log.info("Get user by id");

        return this.userRepository.findOne(id);
    };

    create = (store: Store, user: WithoutId<User>) => {
        const log = this.getScoppedLogger(store);
        log.info("Create user");

        return this.userRepository.create(user);
    };
}
