import {
	axiosInstance,
	BACKEND_URL,
} from './axiosConfig';

import products from '../assets/dummy-data/product-catalogue.json';

export const getProductCatalogue = async () => {
    return products;
}

export const postProduct = async (product: any) => {
    product = {...product};
    product.username = 'abc';
    const response = await axiosInstance.post(`${BACKEND_URL}/product`, product);
    return response.data;
}

export const removeProduct = async (product: any) => {
    const toRemove = { id: product.id };
    const response = await axiosInstance.delete(`${BACKEND_URL}/product`, {data: toRemove});
    return response.data;
}

export const getCart = async () => {
    const response = await axiosInstance.get(`${BACKEND_URL}/product`);
    return response.data;
}