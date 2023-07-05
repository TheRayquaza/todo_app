import User from "../../src/db/user";
import { describe, expect, it } from "@jest/globals";
import { generate_user, get_token } from "../utils/utils";

let init: RequestInit = { method : "POST", headers: { "Content-Type": "application/json" }};
let url : RequestInfo = "http://localhost:8080/api/task/";
let response : Response;
let json : any;
let user : User;
let token : string;

const username = "TEST_USER1234$";
const password = "TEST_PASSWORD1234$";
const email = "TEST_EMAIL1234$@gmail.com";

describe('POST /api/task/', () => {

    beforeEach(async () : Promise<void> => {
        user = await generate_user(username, password);
        token = await get_token(username, password);
        init = { method : "POST", headers: { "Content-Type": "application/json", "Authorization" : "Bearer " + token} };
    });

    afterEach(async () : Promise<void> => {
        await User.destroy({ where : { } });
    });

    it('201 : new task and send the result', async () => {
        init.body = JSON.stringify({ title : "TEST_TITLE", description : "TEST_DESCRIPTION" });

        response = await fetch(url, init);
        json = await response.json();

        expect(response.status).toEqual(201);
        expect(json).toEqual({
            title: "TEST_TITLE",
            description: "TEST_DESCRIPTION",
            id : expect.any(Number),
            done: false,
            creation_date: expect.any(String),
            priority: 0,
            deadline: null,
            user_id: user.dataValues.id
        });
    });
});
