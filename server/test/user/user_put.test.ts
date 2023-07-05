import User from "../../src/db/user";
import { describe, expect, it } from "@jest/globals";
import { get_token, generate_user } from "../utils/utils";

let init: RequestInit;
let url : RequestInfo = "http://localhost:8080/api/user/";
let response : Response;
let json : any;
let user : User;
let token : string;

const username = "TEST_USER1234$";
const password = "TEST_PASSWORD1234$";
describe('PUT /api/user/', () => {

    beforeEach(async (): Promise<void> => {
        user = await generate_user(username, password);
        token = await get_token(username, password);
        init = { method : "PUT", headers: { "Content-Type": "application/json", "Authorization" : "Bearer " + token} };
    });

    afterEach(async () : Promise<void> => {
        await User.destroy({ where : { } });
    });

    it('401 : token is invalid', async () => {
        if (init.headers)
            init.headers = {"Authorization" : "Bearer " + token + "INVALID", "Content-Type": "application/json"};

        if (user && user.dataValues.id) {
            response = await fetch(url, init);
            json = await response.json();

            expect(response.status).toEqual(401);
            expect(json).toEqual({
                status: 401,
                error: 'Invalid token',
            });
        }
    })

    it("400 : Password is not valid", async () => {
        init.body = JSON.stringify({ password : "INVALID_PASSWORD" });

        if (user && user.dataValues.id) {
            response = await fetch(url, init);
            json = await response.json();

            expect(response.status).toEqual(400);
            expect(json).toEqual({
                status: 400,
                error: 'Password did not meet expectations',
            });
        }
    })

    it("400 : Username is not valid", async () => {
        init.body = JSON.stringify({ username : "us" });

        if (user && user.dataValues.id) {
            response = await fetch(url, init);
            json = await response.json();

            expect(response.status).toEqual(400);
            expect(json).toEqual({
                status: 400,
                error: 'Username did not meet expectations',
            });
        }
    });

    it("400 : Email is not valid", async () => {
        init.body = JSON.stringify({ email : "us" });

        if (user && user.dataValues.id) {
            response = await fetch(url, init);
            json = await response.json();

            expect(response.status).toEqual(400);
            expect(json).toEqual({
                status: 400,
                error: 'Email did not meet expectations',
            });
        }
    });
});
