import User from "../../src/db/user";
import { expect, describe, it } from "@jest/globals";
import { get_token, generate_user } from "../utils/utils";

let init: RequestInit = { headers: { "Content-Type": "application/json" }};
let url : RequestInfo = "http://localhost:8080/api/user/";
let response : Response;
let json : any;
let user : User;
let token : string;

const username = "TEST_USER1234$";
const password = "TEST_PASSWORD1234$";

describe("GET /api/user", () => {

    beforeEach(async () : Promise<void> => {
        user = await generate_user(username, password);
        token = await get_token(username, password);
        init = { method: "GET", headers: { "Content-Type": "application/json", "Authorization" : "Bearer " + token }};
    });

    afterEach(async () : Promise<void> => {
        await User.destroy({ where : { } });
    });

    it("200 : retrieve user info", async () => {
        response = await fetch(url, init);
        json = await response.json();

        expect(response.status).toEqual(200);
        expect(json).toEqual({
            id: expect.any(Number),
            username: expect.any(String),
            email: expect.any(String),
            last_connection: expect.any(String),
            creation_date: expect.any(String)
        });
    });

    it("401 : wrong token", async () => {
        init = { method: "GET", headers: { "Content-Type": "application/json", "Authorization" : "Bearer FAKE"}};

        response = await fetch(url, init);
        json = await response.json();

        expect(response.status).toEqual(401);
        expect(json).toEqual({
            status: 401,
            error: "Invalid token"
        });
    });

})

