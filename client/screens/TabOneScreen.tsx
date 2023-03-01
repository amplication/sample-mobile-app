import { StyleSheet, View } from "react-native";
import { RootTabScreenProps } from "../types";
import CreateTask from "../components/CreateTask";
import Tasks from "../components/Tasks";
import { useEffect, useState } from "react";
import { me } from "../lib/auth";
import Auth from "../components/Auth";
import * as tasksLib from "../lib/tasks";

type Task = { id: string; text: string; completed: boolean };
type User = {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    roles: string[];
    createdAt: string;
    updatedAt: string;
};

export default function TabOneScreen({
    navigation,
}: RootTabScreenProps<"TabOne">) {
    const [user, setUser] = useState<User | undefined>();
    const [tasks, setTasks] = useState<Array<Task>>([]);

    const setUserFetchTasks = async (user: User) => {
        setUser(user);
        if (!user) return;
        const result = await tasksLib.getAll(user.id);
        setTasks(result);
    };

    useEffect(() => {
        async function getUser() {
            const result = await me();
            setUserFetchTasks(result);
        }
        getUser();
    }, [setUser, setTasks]);

    const addTask = async (task: string) => {
        if (user === undefined) {
            return;
        }
        const newTask = await tasksLib.create(task, user.id);
        if (!newTask) return;
        const temp = [...tasks];
        temp.push(newTask);
        setTasks(temp);
    };

    const toggleCompleted = async (task: Task) => {
        const updatedTask = await tasksLib.update(task);
        if (!updatedTask) return;
        let temp = [...tasks];
        const i = temp.findIndex((t) => t.id === updatedTask.id);
        temp[i] = updatedTask;
        setTasks(temp);
    };
    return (
        <View>
            {user ? (
                <View>
                    <CreateTask addTask={addTask} />
                    <Tasks tasks={tasks} toggleCompleted={toggleCompleted} />
                </View>
            ) : (
                <Auth setUser={setUserFetchTasks} />
            )}
        </View>
    );
}
