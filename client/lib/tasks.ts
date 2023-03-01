import qs from "qs";
import { createUrl, get, patch, post } from "./http";

type Task = { id: string; text: string; completed: boolean };

export const create = async (text: string, uid: string) => {
    const result = (
        await post(createUrl("/api/tasks"), {
            completed: false,
            text,
            uid: { id: uid },
        }).catch(() => null)
    )?.data;

    if (!result) {
        return alert("Could not create task");
    }

    return result;
};

export const getAll = async (uid: string) => {
    const query = qs.stringify({
        where: { uid: { id: uid } },
        orderBy: { createdAt: "asc" },
    });
    const result = (
        await get(createUrl(`/api/tasks?${query}`)).catch(() => null)
    )?.data;

    if (!result) {
        alert("Could not get tasks");
        return [];
    }

    return result;
};

export const update = async (task: Task) => {
    const result = (
        await patch(createUrl(`/api/tasks/${task.id}`), {
            completed: !task.completed,
        }).catch(() => null)
    )?.data;

    if (!result) {
        return alert("Could not update task");
    }

    return result;
};
