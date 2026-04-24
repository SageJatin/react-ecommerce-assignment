import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const loginUser = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    username,
    password,
  });
  return response.data;
};

export const fetchAllProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data.products;
};