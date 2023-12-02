import { describe, expect, it } from "bun:test";
import { UserRequests } from "@user/views/request/user.request";
import { User } from "@user/models/user.model";
import { ApplicationRequestParser } from "@common/requests";

describe("UserRequest", () => {
    describe("parse", () => {
        describe("spec type is UserRequests.create", () => {
            it("should return parsed object if all fields are present", () => {
                const body = {
                    first_name: "test",
                    last_name: "somemeial",
                    age: 10,
                    idk: true,
                };

                expect(
                    ApplicationRequestParser.parse(body, UserRequests.create)
                ).toEqual({
                    firstName: "test",
                    lastName: "somemeial",
                    age: 10,
                    idk: true,
                });
            });

            it("should return parsed object even if some types mismatch", () => {
                const body = {
                    first_name: "test",
                    last_name: "somemeial",
                    age: "10",
                };

                expect(
                    ApplicationRequestParser.parse(body, UserRequests.create)
                ).toEqual({
                    firstName: "test",
                    lastName: "somemeial",
                    age: 10,
                });
            });

            it("should not throw error if type of an optional field mismatch", () => {
                const body = {
                    first_name: "test",
                    last_name: "somemeial",
                    age: "10",
                    idk: "supercoolstring",
                };

                expect(() =>
                    ApplicationRequestParser.parse(body, UserRequests.create)
                ).not.toThrow();
            });

            it("should throw error if type of a required field mismatch", () => {
                const body = {
                    first_name: 10,
                    last_name: "somemeial",
                    age: "10",
                };

                expect(() =>
                    ApplicationRequestParser.parse(body, UserRequests.create)
                ).toThrow();
            });

            it("should throw error if a required field is not present", () => {
                const body = {
                    last_name: "somemeial",
                    age: "10",
                };

                expect(() =>
                    ApplicationRequestParser.parse(body, UserRequests.create)
                ).toThrow();
            });
        });

        describe("spec type is UserRequests.update", () => {
            it("should return parsed object even if it is a class", () => {
                const user = new User();
                user.firstName = "test";
                user.lastName = "test2";
                user.age = 10;

                const body = {
                    user,
                };

                expect(
                    ApplicationRequestParser.parse(body, UserRequests.update)
                ).toEqual({
                    user: {
                        firstName: "test",
                        lastName: "test2",
                        age: 10,
                    },
                });
            });
        });
    });
});
