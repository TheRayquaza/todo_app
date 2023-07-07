import { useEffect, useContext } from 'react';
import { Text } from '@chakra-ui/layout';

import { UserContext } from '../context/UserContext';

const Default = () => {
    const { setToken, setLoggedIn, setUsername, setId } = useContext(UserContext);
    useEffect(() => {
        if (localStorage.getItem("logged") === "true") {
            setToken(localStorage.getItem("token") as string);
            setLoggedIn(true);
            setUsername(localStorage.getItem("username") as string);
            setId(parseInt(localStorage.getItem("id") as string));
        }
        document.title = 'Home';
    }, []);

    return (
        <Text fontSize="3xl" variant="h2" align="center" color="primary" mb={6}>
            Welcome to Todo App
        </Text>
    );
};

export default Default;
