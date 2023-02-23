import React from "react";
import Task from "./Task";
import { View } from "react-native";

type Props = {
    tasks: Array<{ id: string; text: string; completed: boolean }>;
    toggleCompleted: Function;
};

const Tasks = ({ tasks, toggleCompleted }: Props) => {
    return (
        <View>
            {tasks.map((task) => (
                <Task
                    task={task}
                    key={task.id}
                    toggleCompleted={toggleCompleted}
                />
            ))}
        </View>
    );
};

export default Tasks;
