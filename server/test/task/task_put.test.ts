import User from "../../src/db/user";
import { describe, expect, it, beforeEach, afterEach } from "@jest/globals";
import { get_token, generate_user } from "../utils/utils";

let init: RequestInit;
let url: RequestInfo = "http://localhost:8080/api/task/";
let response: Response;
let json: any;
let user: User;
let token: string;

const username = "TEST_USER1234$";
const password = "TEST_PASSWORD1234$";

describe('PUT /api/task/', () => {
    beforeEach(async (): Promise<void> => {
        user = await generate_user(username, password);
        token = await get_token(username, password);
        init = { method: "PUT", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token } };
    });

    afterEach(async (): Promise<void> => {
        await User.destroy({ where: {} });
    });

    it('401 : token is invalid', async () => {
        if (init.headers)
            init.headers = { "Authorization": "Bearer " + token + "INVALID", "Content-Type": "application/json" };

        if (user && user.dataValues.id) {
            response = await fetch(url, init);
            json = await response.json();

            expect(response.status).toEqual(401);
            expect(json).toEqual({
                status: 401,
                error: 'Invalid token',
            });
        }
    });

    it("201 : new task and send the result", async () => {
        if (user && user.dataValues.id) {
            init.body = JSON.stringify({
                title: "New Task",
                description: "Task description",
                priority: 2,
                deadline: null
            });
            response = await fetch(url, init);
            json = await response.json();

            expect(response.status).toEqual(201);
            expect(json).toEqual({
                status: 201,
                success: true
            });
        } else {
            fail("user not found");
        }
    });
});
