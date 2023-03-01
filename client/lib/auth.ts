import { Alert } from "react-native";
import { createUrl, get, isStoredJwt, post, setStoredJwt } from "./http";

export const me = async () => {
    return (await isStoredJwt())
        ? (await get(createUrl("api/me")).catch(() => null))?.data
        : null;
};

export const login = async (username: string, password: string) => {
    const result = (
        await post(createUrl("api/login"), { username, password }).catch(
            (error) => console.log(error)
        )
    )?.data;

    if (!result) {
        return Alert.alert("Could not login");
    }
    setStoredJwt(result.accessToken);
    return me();
};

export const signup = async (username: string, password: string) => {
    const result = (
        await post(createUrl("api/signup"), { username, password }).catch(
            (error) => console.log(error)
        )
    )?.data;

    if (!result) {
        return Alert.alert("Could not sign up");
    }
    setStoredJwt(result.accessToken);
    return me();
};
