import React from "react";
import { StyleSheet, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type Props = {
    task: { id: string; text: string; completed: boolean };
    toggleCompleted: Function;
};

const Task = ({ task, toggleCompleted }: Props) => {
    const handleToggle = () => {
        toggleCompleted(task);
    };

    return (
        <View style={styles.task}>
            <BouncyCheckbox
                size={20}
                fillColor="#f44336"
                unfillColor="#FFFFFF"
                text={task.text}
                textStyle={{ fontSize: 20 }}
                iconStyle={{ borderColor: "red" }}
                innerIconStyle={{ borderWidth: 2 }}
                onPress={handleToggle}
                isChecked={task.completed}
            />
        </View>
    );
};

export default Task;

const styles = StyleSheet.create({
    task: {
        paddingHorizontal: 30,
        marginBottom: 10,
    },
});
