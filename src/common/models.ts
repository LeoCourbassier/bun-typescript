import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export abstract class ApplicationModel {
    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type AtLeastId<T extends { id: string }> = AtLeast<T, "id">;
export type WithoutId<TSchema> = {
    [P in Exclude<keyof TSchema, "id">]: TSchema[P];
};
