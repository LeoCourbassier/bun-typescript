import { AtLeastId, WithoutId } from "common/models";
import { ApplicationRepository } from "common/repositories";
import { NotFoundError } from "@errors/index";
import { User } from "@user/models/user.model";
import { Service } from "typedi";

@Service()
export class UserRepository extends ApplicationRepository(User) {
    find(): Promise<User[]> {
        return this.repository.find();
    }

    findOne(id: string): Promise<User | null> {
        return this.repository.findOneBy({
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
