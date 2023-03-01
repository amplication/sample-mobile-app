import { gql, isStoredJwt, setStoredJwt, client } from "./apollo";

const GET_ME = gql`
    query me {
        me {
            id
        }
    }
`;

export const me = async () => {
    return (await isStoredJwt())
        ? (
              await client
                  .query({ query: GET_ME })
                  .catch((error) => console.log(error))
          )?.data.me
        : null;
};

const LOGIN = gql`
    mutation login($credentials: Credentials!) {
        login(credentials: $credentials) {
            accessToken
        }
    }
`;

export const login = async (username: string, password: string) => {
    const result = (
        await client
            .mutate({
                mutation: LOGIN,
                variables: { credentials: { username, password } },
            })
            .catch((error) => console.log(error))
    )?.data.login;

    if (!result) {
        return alert("Could not login");
    }
    setStoredJwt(result.accessToken);
    return me();
};
const SIGNUP = gql`
    mutation signup($credentials: Credentials!) {
        signup(credentials: $credentials) {
            accessToken
        }
    }
`;

export const signup = async (username: string, password: string) => {
    const result = (
        await client
            .mutate({
                mutation: SIGNUP,
                variables: { credentials: { username, password } },
            })
            .catch((error) => console.log(error))
    )?.data.signup;

    if (!result) {
        return alert("Could not sign up");
    }
    setStoredJwt(result.accessToken);
    return me();
};
