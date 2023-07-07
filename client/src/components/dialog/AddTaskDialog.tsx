import { useState, useContext, Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Textarea,
} from "@chakra-ui/react";

import task from "../../type/task.ts";
import { send_request } from "../../scripts/request.ts";
import { UserContext } from "../../context/UserContext.tsx";

type AddTaskDialogProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const AddTaskDialog = (props: AddTaskDialogProps) => {
    const { open, setOpen } = props;

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<number>(0);

    const { token, tasks, setTasks } = useContext(UserContext);

    const addTask = async () => {
        let response: any = await send_request(
            "/api/task",
            "POST",
            {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            {
                title: title,
                description: description,
                priority: priority,
                deadline: new Date(),
                done: false,
            }
        );

        if (response.error) {
            toast.error(response.error);
        } else {
            setTasks((prevTasks) => [...prevTasks, response]);
            setOpen(false);
        }
    };

    const handleCancel = () => {
        setTitle("");
        setDescription("");
        setPriority(0);
        setOpen(false);
    };

    return (
        <Modal isOpen={open} onClose={handleCancel}>
            <ModalOverlay />
            <ModalContent padding={3}>
                <ModalHeader>Create Task</ModalHeader>
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Enter a title"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder="Enter a description"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Priority</FormLabel>
                        <Input
                            type="number"
                            value={priority}
                            onChange={(event) => setPriority(Number(event.target.value))}
                            placeholder="Enter priority"
                        />
                    </FormControl>
                </Stack>
                <ModalFooter>
                    <Button onClick={addTask} colorScheme="blue">
                        Create task
                    </Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddTaskDialog;
