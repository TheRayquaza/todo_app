import { useState, createContext, Dispatch, SetStateAction, ReactNode } from "react";
import task from "../type/task.ts";

type UserContextType = {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
    loggedIn: boolean;
    setLoggedIn: Dispatch<SetStateAction<boolean>>;
    id: number | null;
    setId: Dispatch<SetStateAction<number | null>>;
    username: string;
    setUsername: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    tasks: task[];
    setTasks: Dispatch<SetStateAction<task[]>>;
};

const initialState: UserContextType = {
    token: "",
    setToken: () => {},
    loggedIn: false,
    setLoggedIn: () => {},
    id: null,
    setId: () => {},
    username: "",
    setUsername: () => {},
    email : "",
    setEmail: () => {},
    tasks : [],
    setTasks: () => []
};

export const UserContext = createContext<UserContextType>(initialState);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string>("");
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [id, setId] = useState<number | null>(null);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [tasks, setTasks] = useState<task[]>([]);

    return (
        <UserContext.Provider value={{ token, setToken, loggedIn, setLoggedIn, id, setId, username, setUsername, email, setEmail, tasks, setTasks }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;