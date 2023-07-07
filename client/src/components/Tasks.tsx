import { List, ListItem, Divider } from "@chakra-ui/react";
import { useContext, Dispatch, SetStateAction } from "react";

import task from "../type/task";
import { UserContext } from "../context/UserContext.tsx";
import Task from "./Task.tsx";

type TasksProps = {
    setTaskToEdit : Dispatch<SetStateAction<task | null>>,
    setOpenTaskEditDialog : Dispatch<SetStateAction<boolean>>
}

const Tasks = (props : TasksProps) => {
    const { tasks } = useContext(UserContext);
    const { setOpenTaskEditDialog, setTaskToEdit } = props;

    return (
        <div>
            <List>
                {tasks.map((task, index) => (
                    <ListItem key={index}>
                        <Task
                            task={task}
                            setOpenTaskEditDialog={setOpenTaskEditDialog}
                            setTaskToEdit={setTaskToEdit}
                        />
                        <Divider />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default Tasks;
