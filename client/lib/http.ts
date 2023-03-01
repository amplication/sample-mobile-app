import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = "http://localhost:3000";
const jwtKey = "accessToken";

axios.interceptors.request.use(
    async (config) => {
        if (config.url === undefined) {
            return config;
        }

        const origin = config.url;
        const allowedOrigins = apiUrl;
        const accessToken = await AsyncStorage.getItem(jwtKey);

        if (origin.includes(allowedOrigins)) {
            config.headers.authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.log(error);
    }
);

export const createUrl = (endpoint: string | URL) =>
    new URL(endpoint, apiUrl).href;
export const isStoredJwt = async () =>
    Boolean(await AsyncStorage.getItem(jwtKey));
export const setStoredJwt = async (accessToken: string) =>
    AsyncStorage.setItem(jwtKey, accessToken);
export const get = axios.get;
export const patch = axios.patch;
export const post = axios.post;
