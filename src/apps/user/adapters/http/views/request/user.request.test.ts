import { describe, expect, it } from "bun:test";
import { ApplicationRequest } from "../../../../../../commons/requests";
import { UserRequests } from "@user/views/request/user.request";
import { User } from "@user/models/user.model";

describe("UserRequest", () => {
    describe("parse", () => {
        describe("spec type is UserRequests.create", () => {
            it("should return parsed object if all fields are present", () => {
                const body = {
                    name: "test",
                    email: "somemeial",
                    age: 10,
                    idk: true,
                };

                expect(
                    ApplicationRequest.parse(body, UserRequests.create)
                ).toEqual(body);
            });

            it("should return parsed object even if some types mismatch", () => {
                const body = {
                    name: "test",
                    email: "somemeial",
                    age: "10",
                };

                expect(
                    ApplicationRequest.parse(body, UserRequests.create)
                ).toEqual({
                    name: "test",
                    email: "somemeial",
                    age: 10,
                });
            });

            it("should not throw error if type of an optional field mismatch", () => {
                const body = {
                    name: "test",
                    email: "somemeial",
                    age: "10",
                    idk: "supercoolstring",
                };

                expect(() =>
                    ApplicationRequest.parse(body, UserRequests.create)
                ).not.toThrow();
            });

            it("should throw error if type of a required field mismatch", () => {
                const body = {
                    name: 10,
                    email: "somemeial",
                    age: "10",
                };

                expect(() =>
                    ApplicationRequest.parse(body, UserRequests.create)
                ).toThrow();
            });

            it("should throw error if a required field is not present", () => {
                const body = {
                    email: "somemeial",
                    age: "10",
                };

                expect(() =>
                    ApplicationRequest.parse(body, UserRequests.create)
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
                    ApplicationRequest.parse(body, UserRequests.update)
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
