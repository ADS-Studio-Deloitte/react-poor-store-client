import {
	axiosInstance,
	BACKEND_URL,
} from './axiosConfig';

export const postProduct = async (product: any) => {
    product.username = 'Local Tester'
    const response = await axiosInstance.post(`${BACKEND_URL}/product`, product);
    return response.data;
}

export const removeProduct = async (product: any) => {
    const toRemove = { id: product.id, username: 'Local Tester' };
    const response = await axiosInstance.delete(`${BACKEND_URL}/product`, {data: toRemove});
    return response.data;
}

export const getCart = async () => {
    const username = 'Local Tester'
    const response = await axiosInstance.get(`${BACKEND_URL}/product`, { params: { username } });
    return response.data;
}