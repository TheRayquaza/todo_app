import { Box, Checkbox, Flex, IconButton, Spacer, Tooltip } from "@chakra-ui/react";
import { EditIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction, useContext } from "react";
import { toast } from "react-toastify";

import { send_request } from "../scripts/request.ts";
import task from "../type/task";
import { UserContext } from "../context/UserContext.tsx";

type TaskProps = {
    task: task;
    setTaskToEdit: Dispatch<SetStateAction<task>>;
    setOpenTaskEditDialog: Dispatch<SetStateAction<boolean>>;
};

const Task = (props: TaskProps) => {
    const { token, setTasks } = useContext(UserContext);
    const { task, setTaskToEdit, setOpenTaskEditDialog } = props;

    const handleCheckClick = async () => {
        task.done = !task.done;
        setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? task : t)));

        const json = await send_request(
            `/api/task/${task.id}`,
            "PUT",
            {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            {
                done: task.done,
            }
        );

        if (json.error)
            toast.error(json.error);
    };

    const handleDeleteClick = async () => {
        const json = await send_request(`/api/task/${task.id}`, "DELETE", {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        });

        if (json.error) toast.error(json.error);
        else {
            toast.success("Task deleted");
            setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
        }
    };

    const handleEditClick = () => {
        setTaskToEdit(task);
        setOpenTaskEditDialog(true);
    };

    return (
        <Flex align="center" p={2} border="1px solid" borderColor="gray.200" borderRadius="md">
            <Checkbox isChecked={task.done} onChange={handleCheckClick} />
            <Box flex="1" ml={2} textDecoration={task.done ? "line-through" : "none"}>
                {task.title}
            </Box>
            <Spacer />
            <Tooltip label={task.done ? "Mark as not done" : "Mark as done"} hasArrow placement="top">
                <IconButton
                    colorScheme="green"
                    aria-label={task.done ? "Mark as not done" : "Mark as done"}
                    icon={<CheckIcon />}
                    onClick={handleCheckClick}
                />
            </Tooltip>
            <Tooltip label="Edit" hasArrow placement="top">
                <IconButton
                    icon={<EditIcon />}
                    variant="ghost"
                    colorScheme="blue"
                    onClick={handleEditClick}
                    aria-label="Edit"
                />
            </Tooltip>
            <Tooltip label="Delete" hasArrow placement="top">
                <IconButton
                    icon={<CloseIcon />}
                    variant="ghost"
                    colorScheme="red"
                    onClick={handleDeleteClick}
                    aria-label="Delete"
                />
            </Tooltip>
        </Flex>
    );
};

export default Task;
