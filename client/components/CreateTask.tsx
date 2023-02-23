import React, { useState } from "react";
import {
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from "react-native";

type Props = {
    addTask: (task: string) => void;
};

const CreateTask = ({ addTask }: Props) => {
    const [task, setTask] = useState<string>("");

    const handleChange = (task: string) => {
        setTask(task);
    };

    const handleSubmit = () => {
        addTask(task);
        setTask("");
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="TODO"
                value={task}
                onChangeText={handleChange}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CreateTask;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 30,
    },
    input: {
        marginBottom: 10,
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        padding: 10,
        height: 60,
        fontSize: 18,
    },
    button: {
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f44336",
        fontSize: 20,
        marginVertical: 4,
        width: "100%",
        height: 60,
    },
    addText: {
        color: "#ffffff",
        textTransform: "uppercase",
    },
});
