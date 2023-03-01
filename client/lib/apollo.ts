import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = "http://localhost:3000/graphql";
const jwtKey = "accessToken";

const httpLink = createHttpLink({
    uri: apiUrl,
});

const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem(jwtKey);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export const isStoredJwt = async () =>
    Boolean(await AsyncStorage.getItem(jwtKey));
export const setStoredJwt = async (accessToken: string) =>
    AsyncStorage.setItem(jwtKey, accessToken);
export { gql } from "@apollo/client";
