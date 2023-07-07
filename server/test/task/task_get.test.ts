import User from "../../src/db/user";
import Task from "../../src/db/task";
import { expect, describe, it } from "@jest/globals";
import {get_token, generate_user, generate_task} from "../utils/utils";

let init: RequestInit = { headers: { "Content-Type": "application/json" }};
let url : RequestInfo = "http://localhost:8080/api/task/";
let response : Response;
let json : any;
let user : User;
let tasks : Task[] = [];
let token : string;

const username = "TEST_USER1234$";
const password = "TEST_PASSWORD1234$";

describe("GET /api/task", () => {

    beforeEach(async () : Promise<void> => {
        user = await generate_user(username, password);
        for (let i = 0; i < 10; i++)
            tasks.push(await generate_task(user, "title" + i, "description" + i, new Date()));
        token = await get_token(username, password);
        init = { method: "GET", headers: { "Content-Type": "application/json", "Authorization" : "Bearer " + token }};
    });

    afterEach(async () : Promise<void> => {
        await User.destroy({ where : { } });
    });

    describe("/:id", () => {
        it('200 : retrieve task info', async () => {
            for (let task of tasks) {
                url = "http://localhost:8080/api/task/" + task.dataValues.id;

                response = await fetch(url, init);
                json = await response.json();

                expect(response.status).toEqual(200);
                expect(json).toEqual(expect.objectContaining({
                    id: expect.any(Number),
                    title: expect.any(String),
                    description: expect.any(String),
                    creation_date: expect.any(String),
                    last_update: expect.any(String),
                    status: expect.any(String),
                    user_id: expect.any(Number)
                }));
            }
        });

        it('404 : task not found', async () => {
            url = "http://localhost:8080/api/task/-1";

            response = await fetch(url, init);
            json = await response.json();

            expect(response.status).toEqual(404);
            expect(json).toEqual({
                status: 404,
                error: "Not Found"
            });
        });
    });

    describe("/", () => {
        it('200 : retrieve all tasks of a user', async () => {
            url = "http://localhost:8080/api/task/";
            response = await fetch(url, init);
            json = await response.json();

            for (let task of tasks)
                expect(json).toEqual(expect.arrayContaining([
                    expect.objectContaining({
                        id: task.dataValues.id,
                        title: task.dataValues.title,
                        description: task.dataValues.description,
                        done: task.dataValues.done,
                        user_id: task.dataValues.user_id,
                        priority: task.dataValues.priority
                    }),
                ]));
        });

        it('401 : wrong token', async () => {
            init = { method: "GET", headers: { "Content-Type": "application/json", "Authorization" : "Bearer FAKE"}};
            url = "http://localhost:8080/api/task/";
            response = await fetch(url, init);
            json = await response.json();

            expect(response.status).toEqual(401);
            expect(json).toEqual({
                status: 401,
                error: "Unauthorized"
            });
        });
    });

})

