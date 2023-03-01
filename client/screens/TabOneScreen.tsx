import { StyleSheet, View } from "react-native";
import { RootTabScreenProps } from "../types";
import CreateTask from "../components/CreateTask";
import Tasks from "../components/Tasks";
import { useEffect, useState } from "react";
import { me } from "../lib/auth";
import Auth from "../components/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Task = { id: string; text: string; completed: boolean };

export default function TabOneScreen({
    navigation,
}: RootTabScreenProps<"TabOne">) {
    const [user, setUser] = useState();
    const [tasks, setTasks] = useState<Array<Task>>([]);
    useEffect(() => {
        async function getUser() {
            const result = await me();
            setUser(result);
        }
        getUser();
    }, [setUser]);

    const createTask = (text: string, id: number) => ({
        id: id.toString(),
        text,
        completed: false,
    });

    const addTask = (task: string) => {
        if (task === "") return;
        const temp = [...tasks];
        temp.push(createTask(task, temp.length));
        setTasks(temp);
    };

    const toggleCompleted = (id: string) => {
        let temp = [...tasks];
        const i = temp.findIndex((t) => t.id === id);
        temp[i].completed = !temp[i].completed;
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
                <Auth setUser={setUser} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
