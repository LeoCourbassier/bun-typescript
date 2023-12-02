import { describe, expect, it } from "bun:test";
import { ApplicationError, InternalServerError, NotFoundError } from ".";

describe("Errors", () => {
    describe("ApplicationError", () => {
        it("Should be an instance of Error", () => {
            expect(new ApplicationError("test")).toBeInstanceOf(Error);
        });
        it("Should have an additionalInfo property", () => {
            expect(new ApplicationError("test").additionalInfo).toBeUndefined();
            expect(new ApplicationError("test", "test").additionalInfo).toEqual(
                "test"
            );
        });
        describe("is", () => {
            it("Should return true if error is an instance of ApplicationError", () => {
                expect(
                    ApplicationError.is(new ApplicationError("test"))
                ).toBeTruthy();
                expect(
                    ApplicationError.is(new NotFoundError("test"))
                ).toBeTruthy();
                expect(ApplicationError.is(new Error("test"))).toBeFalsy();
            });
        });
    });
    describe("Derived classes", () => {
        it("Should be an instance of ApplicationError", () => {
            expect(new NotFoundError("test")).toBeInstanceOf(ApplicationError);
        });
        it("Should have an additionalInfo property", () => {
            expect(new NotFoundError("test").additionalInfo).toBeUndefined();
            expect(new NotFoundError("test", "test").additionalInfo).toEqual(
                "test"
            );
        });
        describe("is", () => {
            it("Should return true if and only if error is instance of Derived class", () => {
                expect(
                    NotFoundError.is(new NotFoundError("test"))
                ).toBeTruthy();
                expect(
                    NotFoundError.is(new ApplicationError("test"))
                ).toBeFalsy();
                expect(
                    NotFoundError.is(new InternalServerError("test"))
                ).toBeFalsy();
                expect(NotFoundError.is(new Error("test"))).toBeFalsy();
            });
        });
    });
});
