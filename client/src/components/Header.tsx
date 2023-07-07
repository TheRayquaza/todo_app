import {Dispatch, SetStateAction, useContext} from "react";
import { Link } from "react-router-dom";
import { Button, Flex, Text } from "@chakra-ui/react";
import Logout from "./Logout";
import { UserContext } from "../context/UserContext.tsx";

type HeaderProps = {
    setLogoutOpen: Dispatch<SetStateAction<boolean>>;
    logoutOpen: boolean;
};

const Header = (props: HeaderProps) => {
    const { loggedIn, username } = useContext(UserContext);
    const { setLogoutOpen, logoutOpen } = props;

    return (
        <Flex as="header" align="center" justify="space-between" bg="primary" py={4} px={8} >
            <Logout open={logoutOpen} setOpen={setLogoutOpen} />

            <Text color="secondary" variant="h6" flex={1}>
                Todo App
            </Text>
            <Flex gap={3}>
                <Button as={Link} to="/">
                    Home
                </Button>
                {loggedIn ? (
                    <>
                        <Button  as={Link} to="/home">
                            Tasks
                        </Button>
                        <Button  onClick={() => setLogoutOpen(true)}>
                            Logout {username}
                        </Button>
                    </>
                ) : (
                    <>
                        <Button  as={Link} to="/login">
                            Login
                        </Button>
                        <Button as={Link} to="/register">
                            Register
                        </Button>
                    </>
                )}
            </Flex>
        </Flex>
    );
};

export default Header;