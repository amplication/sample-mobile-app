import { gql, client } from "./apollo";

type Task = { id: string; text: string; completed: boolean };

const CREATE_TASK = gql`
    mutation createTask($data: TaskCreateInput!) {
        createTask(data: $data) {
            completed
            createdAt
            id
            text
        }
    }
`;

export const create = async (text: string, uid: string) => {
    const result = (
        await client
            .mutate({
                mutation: CREATE_TASK,
                variables: {
                    data: {
                        completed: false,
                        text,
                        uid: { id: uid },
                    },
                },
            })
            .catch(() => null)
    )?.data.createTask;

    if (!result) {
        return alert("Could not create task");
    }

    return result;
};

const GET_TASKS = gql`
    query tasks($where: TaskWhereInput, $orderBy: [TaskOrderByInput!]) {
        tasks(where: $where, orderBy: $orderBy) {
            completed
            createdAt
            id
            text
        }
    }
`;

export const getAll = async (uid: string) => {
    const result = (
        await client
            .query({
                query: GET_TASKS,
                variables: {
                    where: { uid: { id: uid } },
                    orderBy: { createdAt: "Asc" },
                },
            })
            .catch(() => null)
    )?.data.tasks;

    if (!result) {
        alert("Could not get tasks");
        return [];
    }

    return result;
};

const UPDATE_TASK = gql`
    mutation updateTask(
        $data: TaskUpdateInput!
        $where: TaskWhereUniqueInput!
    ) {
        updateTask(data: $data, where: $where) {
            completed
            createdAt
            id
            text
        }
    }
`;

export const update = async (task: Task) => {
    const result = (
        await client
            .mutate({
                mutation: UPDATE_TASK,
                variables: {
                    data: {
                        completed: !task.completed,
                    },
                    where: {
                        id: task.id,
                    },
                },
            })
            .catch(() => null)
    )?.data.updateTask;

    if (!result) {
        return alert("Could not update task");
    }

    return result;
};
