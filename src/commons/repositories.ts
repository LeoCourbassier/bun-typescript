import { DataSource, Repository } from "typeorm";
import { Loggeable } from "./loggeable";
import { Service } from "typedi";
import { ApplicationModel } from "./models";

@Service()
export abstract class RepositoryBase<
    T extends ApplicationModel
> extends Loggeable {
    repository!: Repository<T>;

    constructor(dataSource: DataSource, model: Constructor<T>) {
        super();
        this.repository = dataSource.getRepository<T>(model);
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T = {}> = new (...args: any[]) => T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Class = new (...args: any[]) => any;

export type PublicConstructor<T extends ApplicationModel> = new (
    dataSource: DataSource
) => RepositoryBase<T>;

export const ApplicationRepository = <T extends ApplicationModel>(
    model: Constructor<T>
): PublicConstructor<T> => {
    return class extends RepositoryBase<T> {
        constructor(dataSource: DataSource) {
            super(dataSource, model);
        }
    };
};
