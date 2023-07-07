import User from "../../src/db/user";
import { describe, expect, it } from "@jest/globals";
import { generate_user, get_token } from "../utils/utils";

let init: RequestInit = { method : "POST", headers: { "Content-Type": "application/json" }};
let url : RequestInfo = "http://localhost:8080/api/user/";
let response : Response;
let json : any;
let user : User;
let token : string;

const username = "TEST_USER1234$";
const password = "TEST_PASSWORD1234$";
const email = "TEST_EMAIL1234$@gmail.com";

describe("POST /api/user/", () => {

    beforeEach(async () : Promise<void> => {
        user = await generate_user(username, password);
        token = await get_token(username, password);
        init = { method : "POST", headers: { "Content-Type": "application/json", "Authorization" : "Bearer " + token} };
    });

    afterEach(async () : Promise<void> => {
        await User.destroy({ where : { } });
    });

    it("201 : new user and send the result", async () => {
        init.body = JSON.stringify({ username : username+"NEW", password : password, email : email });

        response = await fetch(url, init);
        json = await response.json();

        expect(response.status).toEqual(201);
        expect(json).toEqual({
            username: username+"NEW",
            email: email,
            id : expect.any(Number),
            last_connection: expect.any(String),
            creation_date: expect.any(String)
        });
    });

    it("401 : username is invalid", async () => {
        init.body = JSON.stringify({ username : "user", password : password, email : email });

        response = await fetch(url, init);
        json = await response.json();

        expect(response.status).toEqual(401);
        expect(json).toEqual({
            error: "Username did not meet expectations",
            status : 401
        });
    });

    it("401 : password is invalid", async () => {
        init.body = JSON.stringify({ username : username, password : "1234", email : email });

        response = await fetch(url, init);
        json = await response.json();

        expect(response.status).toEqual(401);
        expect(json).toEqual({
            error: "Password did not meet expectations",
            status : 401
        });
    });

    it("401 : email is invalid", async () => {
        init.body = JSON.stringify({ username : username, password : password, email : "INVALID_EMAIL"});

        response = await fetch(url, init);
        json = await response.json();

        expect(response.status).toEqual(401);
        expect(json).toEqual({
            error: "Email did not meet expectations",
            status : 401
        });
    });

    it("400 : password, username or email not provided", async () => {
        init.body = JSON.stringify({ });

        response = await fetch(url, init);
        json = await response.json();

        expect(response.status).toEqual(400);
        expect(json).toEqual({
            error: "Username and password required",
            status : 400
        });
    });
});
