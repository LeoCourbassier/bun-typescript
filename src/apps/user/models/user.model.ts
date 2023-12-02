import { ApplicationModel } from "common/models";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User extends ApplicationModel {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    // Give the ability to create a user without any data
    constructor(
        id?: string,
        firstName?: string,
        lastName?: string,
        age?: number
    ) {
        super();
        this.id = id ?? "";
        this.firstName = firstName ?? "";
        this.lastName = lastName ?? "";
        this.age = age ?? 0;
    }
}
