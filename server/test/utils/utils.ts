import User from "../../src/db/user";
import Task from "../../src/db/task";

const generate_random_username = (length : number) : string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';

    while (username.length <= length) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        username += characters.charAt(randomIndex);
    }
    return username;
}

const generate_random_password = () : string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = 'A$1';

    while (password.length <= 20) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }
    return password;
}

export const generate_user = async (username : string, password: string) : Promise<User> => {
    let init : RequestInit = { method: "POST", headers: { "Content-Type": "application/json" }};
    init.body = JSON.stringify({ username : username, password : password, email : username+"@gmail.com"});

    let response : Response = await fetch("http://localhost:8080/register", init);
    let json : any = await response.json();

    if (response.status != 201)
        throw new Error("unable to create user : " + json.error);

    return await User.findByPk(json.id) as User;
}

export const generate_task = async (user : User, title : string, description : string, deadline : Date) : Promise<Task> => {
    let init : RequestInit = { method: "POST", headers: { "Content-Type": "application/json" }};
    init.body = JSON.stringify({ title : title, description : description, deadline : deadline});

    let response : Response = await fetch("http://localhost:8080/api/task/", init);
    let json : any = await response.json();

    if (response.status != 201)
        throw new Error("unable to create task : " + json.error);

    return await Task.findByPk(json.id) as Task;
}

export const get_token = async (username : string, password : string) : Promise<string> => {
    let init : RequestInit = { method: "POST", headers: { "Content-Type": "application/json" }};
    init.body = JSON.stringify({ username : username, password : password});

    let response : Response = await fetch("http://localhost:8080/login", init);
    let json : any = await response.json();

    return json.token;
}