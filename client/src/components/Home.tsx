import { Center, Container, Divider, IconButton, Stack } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import task from "../type/task.ts"
import { send_request } from "../scripts/request.ts"
import Tasks from "./Tasks.tsx";
import { UserContext } from "../context/UserContext.tsx";
import AddTaskDialog from "./dialog/AddTaskDialog.tsx";
import { useNavigate } from "react-router";

const Home = () => {
    const { token, setTasks, loggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn)
            navigate("/login");

        document.title = "My Tasks";
    }, [loggedIn, navigate]);

    const [taskToEdit, setTaskToEdit] = useState<task>();
    const [openTaskEditDialog, setOpenTaskEditDialog] = useState<boolean>(false);
    const [openTaskAddDialog, setOpenAddEditDialog] = useState<boolean>(false);

    const handleDeleteAll = async () => {
        let response: any = await send_request(
            "/api/task",
            "DELETE",
            {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        );

        if (response.error)
            toast.error(response.error);
        else
            setTasks([]);
    }

    const handleRefresh = async () => {
        let response: any = await send_request(
            "/api/task",
            "GET",
            {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        );

        if (response.error)
            toast.error(response.error);
        else
            setTasks(response);
    }

    return (
        <Center height='100%'>
            <Container>
                <Stack direction="row" spacing={4} align="center">
                    <IconButton
                        aria-label="Refresh tasks"
                        icon={<RepeatIcon />}
                        onClick={handleRefresh}
                    />

                    <IconButton
                        onClick={() => setOpenAddEditDialog(true)}
                        icon={<AddIcon />}
                        aria-label="Add a new Task"
                    />

                    <IconButton
                        aria-label="Delete all tasks"
                        icon={<DeleteIcon />}
                        onClick={handleDeleteAll}
                    />
                </Stack>

                <Divider mt={4} mb={4} />

                <Tasks setTaskToEdit={setTaskToEdit} setOpenTaskEditDialog={setOpenTaskEditDialog} />

            </Container>

            <AddTaskDialog open={openTaskAddDialog} setOpen={setOpenAddEditDialog} />
        </Center>
    );
}

export default Home;
