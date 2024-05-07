import axios from 'axios';
import { getUser } from '../auth/cognitoConfig';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

const baseUrl = process.env.REACT_APP_API_URL as string;

const headers = {
	'Content-Type': 'application/json',
	'Accept': '*/*',
};

const requestInterceptor = async (config: any) => {
    const user = getUser();
    let token: string | undefined = '';

    if (user) {
        token = user?.getSignInUserSession()?.getIdToken().getJwtToken();
		console.log('1');

        if (!token) {
            try {
				console.log('2');
                const session = await new Promise<CognitoUserSession>((resolve, reject) => {
                    user.getSession((err: any, session: CognitoUserSession) => {
                        if (err) {
                            console.error('Error getting user session:', err);
                            reject(err);
                        } else {
							user.setSignInUserSession(session);
                            resolve(session);
                        }
                    });
                });
                
                token = session.getIdToken().getJwtToken();
            } catch (error) {
                console.error('Error getting user session:', error);
            }
			console.log('3', user.getSignInUserSession());
        }
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}

const createAxiosInstance = () => {
	const instance = axios.create({
		baseURL: baseUrl,
		headers: headers,
	});
	
	instance.interceptors.request.use(requestInterceptor);

	return instance;
};

export const BACKEND_URL = baseUrl;

export const axiosInstance = createAxiosInstance();
