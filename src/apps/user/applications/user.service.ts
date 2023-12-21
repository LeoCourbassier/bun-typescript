import { Service } from "typedi";
import { ApplicationService } from "@common/services";
import { UserRepository } from "@user/repositories/user.repository";
import { User } from "@user/models/user.model";
import { WithoutId } from "@common/models";
import { NotFoundError } from "elysia";
import { Loggeable } from "@common/loggeable";
import { Logger } from "@bogeychan/elysia-logger/types";
import { ApplicationContext } from "@common/context";
import { UnauthorizedError } from "@errors/http";

@Service()
@Loggeable()
export default class UserService extends ApplicationService {
    constructor(private userRepository: UserRepository) {
        super();
    }

    getAll(_ctx: ApplicationContext, logger?: Logger): Promise<User[]> {
        logger!.debug("Getting all users");

        return this.userRepository.find();
    }

    async getById(
        _ctx: ApplicationContext,
        id: string,
        logger?: Logger
    ): Promise<User> {
        logger!.debug(`Getting user by id ${id}`);

        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        return user;
    }

    async create(
        _ctx: ApplicationContext,
        user: WithoutId<User>,
        logger?: Logger
    ): Promise<User> {
        logger!.debug(`Creating user ${JSON.stringify(user)}`);

        user.password = Bun.password.hashSync(user.password);
        return this.userRepository.create(user);
    }

    async login(
        ctx: ApplicationContext,
        email: string,
        password: string,
        logger?: Logger
    ): Promise<string> {
        logger!.debug(`Logging user ${email}`);

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        if (!Bun.password.verifySync(password, user.password)) {
            throw new UnauthorizedError("User not found");
        }

        const token = await ctx.jwt!.sign({
            id: user.id,
            email: user.email,
        });

        ctx.setCookie!("auth", token, {
            maxAge: 1 * 86400,
            path: "/",
        });

        logger!.debug(`User ${email} logged, cookie generated: ${token}`);

        return token;
    }
}
