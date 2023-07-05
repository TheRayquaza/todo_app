import User from '../../src/db/user';
import { describe, expect, it } from "@jest/globals";
import { fail } from "assert";
import { generate_user, get_token } from "../utils/utils";

let init: RequestInit = { headers: { "Content-Type": "application/json" }};
let url : RequestInfo = "http://localhost:8080/api/user/";
let response : Response;
let json : any;
let user : User;
let token : string;

const username = "TEST_USER1234$";
const password = "TEST_PASSWORD1234$";

describe('DELETE /api/user', () => {
    beforeEach(async () : Promise<void> => {
        user = await generate_user(username, password);
        token = await get_token(username, password);
        init = { method : "DELETE", headers: { "Content-Type": "application/json", "Authorization" : "Bearer " + token} };
    });

    afterEach(async () : Promise<void> => {
        await User.destroy({ where : { } });
    });

    it('200 : delete the user and send success response', async () => {

        if (user && user.dataValues.id) {
            response = await fetch(url, init);
            json = await response.json();

            expect(response.status).toEqual(200);
            expect(json).toEqual({
                status : 200,
                success : true
            });
        } else
            fail("user not found");
    });
});
