import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";

const UserPoolId = process.env.REACT_APP_USER_POOL_ID as string;
const ClientId = process.env.REACT_APP_CLIENT_ID as string;

let loggedUser: CognitoUser | null = null;

const setLoggedUser = () => {
    loggedUser = userPool.getCurrentUser();
    return loggedUser;
}

export const userPool = new CognitoUserPool({ UserPoolId, ClientId });

export const resetUser = () => {
    loggedUser = userPool.getCurrentUser();
}

export const getUser = () => {
    return loggedUser ?? setLoggedUser();
}

