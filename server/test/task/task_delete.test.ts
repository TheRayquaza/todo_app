import User from "../../src/db/user";
import Task from "../../src/db/task";
import { describe, expect, it, beforeEach, afterEach } from "@jest/globals";
import { fail } from "assert";
import { generate_user, get_token } from "../utils/utils";

let init: RequestInit = { headers: { "Content-Type": "application/json" }};
let url : RequestInfo = "http://localhost:8080/api/task/";
let response : Response;
let json : any;
let user : User;
let token : string;

const username = "TEST_USER1234$";
const password = "TEST_PASSWORD1234$";

describe("DELETE /api/task", () => {
    beforeEach(async () : Promise<void> => {
        user = await generate_user(username, password);
        token = await get_token(username, password);
        init = { method : "DELETE", headers: { "Content-Type": "application/json", "Authorization" : "Bearer " + token} };
    });

    afterEach(async () : Promise<void> => {
        await Task.destroy({ where: {} });
        await User.destroy({ where: {} });
    });

    describe("/:id", () => {
        it("200 : delete the task and send success response", async () => {
            if (user && user.dataValues.id) {
                const task = await Task.create({
                    user_id: user.dataValues.id,
                    done : false,
                    priority : 0,
                    title: "Test Task",
                    description: "Test Description"
                });

                response = await fetch(url + task.dataValues.id as string, init);
                json = await response.json();

                expect(response.status).toEqual(200);
                expect(json).toEqual({
                    status : 200,
                    success : true
                });
            } else {
                fail("user not found");
            }
        });

        it("404 : should send an error response if task is not found", async () => {
            response = await fetch(url + "-1", init);
            json = await response.json();

            expect(response.status).toEqual(404);
            expect(json).toEqual({
                status: 404,
                error: "Task -1 not found"
            });
        });

        it("403 : should send an error response if user is not allowed to delete the task", async () => {
            const anotherUser = await generate_user("AnotherUser", "AnotherPassword");
            const task = await Task.create({
                user_id: anotherUser.dataValues.id as number,
                title: "Another User's Task",
                description: "Another User's Task Description",
                done: false,
                priority: 0
            });

            response = await fetch(url + task.dataValues.id ? "" : task.dataValues.id as string, init);
            json = await response.json();

            expect(response.status).toEqual(403);
            expect(json).toEqual({
                status: 403,
                error: "You are not allowed to delete this task"
            });
        });
    });

    describe("/", () => {
        it("200 : delete all tasks and send success response", async () => {
            if (user && user.dataValues.id) {
                const task1 = await Task.create({
                    title: "Test Task 1",
                    description: "Test Description 1",
                    user_id: user.dataValues.id,
                    done: false,
                    priority: 0
                });
                const task2 = await Task.create({
                    title: "Test Task 2",
                    description: "Test Description 2",
                    user_id: user.dataValues.id,
                    done: false,
                    priority: 0
                });

                response = await fetch(url, init);
                json = await response.json();

                expect(response.status).toEqual(200);
                expect(json).toEqual({
                    status : 200,
                    success : true
                });
            } else {
                fail("user not found");
            }
        });

        it("404 : should send an error response if no tasks are found", async () => {
            response = await fetch(url, init);
            json = await response.json();

            expect(response.status).toEqual(404);
            expect(json).toEqual({
                status: 404,
                error: "No tasks found"
            });
        });

    });
});