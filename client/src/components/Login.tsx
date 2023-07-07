import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Button, Text, Input, Card } from "@chakra-ui/react";
import { UserContext } from "../context/UserContext.tsx";
import { send_request } from "../scripts/request.ts";

const Login = () => {
    let navigate = useNavigate();
    const { username, setUsername, setId, setToken, setLoggedIn, loggedIn } = useContext(UserContext);

    useEffect(() => {
        if (loggedIn)
            navigate("/home");
        else if (localStorage.getItem("logged") === "true") {
            setToken(localStorage.getItem("token") as string);
            setLoggedIn(true);
            setUsername(localStorage.getItem("username") as string);
            setId(localStorage.getItem("id") as number);
            navigate("/home");
        }

        document.title = "Login";
    }, []);


    const [password, setPassword] = useState("");

    const handleLogin = async (): Promise<void> => {
        const response = await send_request(
            "/login",
            "POST",
            {
                "Content-Type": "application/json"
            },
            {
                username: username,
                password: password
            });

        if (response.error)
            toast.error(response.error ? response.error : `Unable to login ${username}`);
        else {
            toast.success(username + " logged in");
            setId(response.id);
            setUsername(username);
            setLoggedIn(true);
            setToken(response.token);
            localStorage.setItem("id", response.id);
            localStorage.setItem("username", username);
            localStorage.setItem("token", response.token);
            navigate("/home");
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="90vh"
        >
            <Card minWidth="275px">
                <Box padding="1rem">
                    <Text fontSize="xl" marginBottom="1rem" textAlign="center">
                        Login to your account
                    </Text>
                    <Box as="form">
                        <Text fontSize="sm" marginBottom="0.5rem">Username</Text>
                        <Input
                            width="100%"
                            type="text"
                            variant="outline"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            marginBottom="0.5rem"
                        />
                        <Text fontSize="sm" marginBottom="0.5rem">Password</Text>
                        <Input
                            width="100%"
                            variant="outline"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            marginBottom="0.5rem"
                        />
                        <Button
                            variant="solid"
                            colorScheme="blue"
                            size="lg"
                            width="full"
                            onClick={handleLogin}
                            marginBottom="0.5rem"
                        >
                            Login
                        </Button>
                        <Text>
                            You don't have an account?
                            <Button
                                onClick={() => navigate("/register")}
                                variant="outline"
                                colorScheme="red"
                                marginLeft="0.5rem"
                            >
                                Create a new account
                            </Button>
                        </Text>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default Login;