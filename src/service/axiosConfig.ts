import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL as string;
const headers = {
	'Content-Type': 'application/json',
    'Accept': '*/*',
    'Authorization': 'eyJraWQiOiJLTzRVMWZs'
};

export const BACKEND_URL = baseUrl;

export const axiosInstance = axios.create({
	baseURL: baseUrl,
	headers: headers,
});

// export const credentials: AxiosBasicCredentials = {
// 	username: process.env.REACT_APP_USERNAME as string,
// 	password: process.env.REACT_APP_PASSWORD as string,
// };
