import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { login, signup } from "../lib/auth";

type User = {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    roles: string[];
    createdAt: string;
    updatedAt: string;
};
interface AuthProps {
    setUser: (user: User) => Promise<void>;
}

export default function Auth({ setUser }: AuthProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleUsernameChange = (text: string) =>
        setUsername(text.toLowerCase());
    const handlePasswordChange = (text: string) => setPassword(text);
    const handleConfirmChange = (text: string) => setConfirm(text);

    const handleSubmit = async () => {
        if (username === "" || (password === "" && confirm === "")) {
            return;
        }
        const func = isLogin ? login : signup;
        if (!isLogin) {
            if (password !== confirm) {
                return Alert.alert("Passwords do not match");
            }
        }

        const result = await func(username, password);
        setUser(result);
    };

    return (
        <View>
            <Text>{isLogin ? "Login" : "Sign Up"}</Text>
            <TextInput
                style={{
                    padding: 10,
                }}
                placeholder="username"
                value={username}
                onChangeText={handleUsernameChange}
            />
            <TextInput
                style={{
                    padding: 10,
                }}
                placeholder="password"
                value={password}
                autoCapitalize="none"
                onChangeText={handlePasswordChange}
            />
            {!isLogin && (
                <TextInput
                    style={{
                        padding: 10,
                    }}
                    placeholder="confirm password"
                    autoCapitalize="none"
                    value={confirm}
                    onChangeText={handleConfirmChange}
                />
            )}
            <Button title="Submit" onPress={handleSubmit} />
            <Button
                title={
                    isLogin ? "Need an account?" : "Already have an account?"
                }
                onPress={() => setIsLogin(!isLogin)}
            />
        </View>
    );
}
