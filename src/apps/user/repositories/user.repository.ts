import { AtLeastId } from "@commons/models";
import { ApplicationRepository } from "@commons/repositories";
import { NotFoundError } from "@errors/index";
import { User } from "@user/models/user.model";
import { Service } from "typedi";
import { WithoutId } from "typeorm";

@Service()
export class UserRepository extends ApplicationRepository(User) {
    find(): Promise<User[]> {
        return this.repository.find();
    }

    findOne(id: string): Promise<User> {
        return this.repository.findOneByOrFail({
            id,
        });
    }

    create(user: WithoutId<User>): Promise<User> {
        return this.repository.save(user);
    }

    update(user: AtLeastId<User>): Promise<User> {
        return this.repository.save(user);
    }

    delete(id: string): Promise<void> {
        return this.repository.delete(id).then((result) => {
            if (result.affected === 0) {
                throw new NotFoundError(id);
            }
        });
    }
}
