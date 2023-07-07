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

type EditTaskDialogProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    task: task | null;
};

const EditTaskDialog = (props: EditTaskDialogProps) => {
    const { open, setOpen, task } = props;

    const [title, setTitle] = useState<string>(task ? task.title : "");
    const [description, setDescription] = useState<string>(task ? task.description : "");
    const [priority, setPriority] = useState<number>(task ? task.priority : 0);

    const { token } = useContext(UserContext);

    const editTask = async () => {
        if (task) {
            let response: any = await send_request(
                `/api/task/${task?.id?.toString()}`,
                "PUT",
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

            if (response.error)
                toast.error(response.error);
            else
                setOpen(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Modal isOpen={open} onClose={handleCancel}>
            <ModalOverlay />
            <ModalContent padding={3}>
                <ModalHeader>Edit Task</ModalHeader>
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
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
                    <Button onClick={editTask} colorScheme="blue">Edit</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditTaskDialog;
