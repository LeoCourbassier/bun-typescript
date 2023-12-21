import { ApplicationModel } from "@common/models";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User extends ApplicationModel {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    password!: string;

    // Give the ability to create a user without any data
    constructor(
        id?: string,
        email?: string,
        firstName?: string,
        lastName?: string,
        age?: number,
        password?: string
    ) {
        super();
        this.id = id ?? "";
        this.email = email ?? "";
        this.firstName = firstName ?? "";
        this.lastName = lastName ?? "";
        this.age = age ?? 0;
        this.password = password ?? "";
    }
}
