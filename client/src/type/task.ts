
type task = {
    id: number | null;
    title: string;
    description: string;
    done: boolean;
    priority: number;
    deadline: Date | null;
    creation_date: Date | null;
    user_id: number;
}

export default task;