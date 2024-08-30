import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async (page = 1, limit = 6) => {
  try {
    const response = await axios.get(`${API_URL}?_page=${page}&_limit=${limit}`);
    const totalUsers = parseInt(response.headers['x-total-count'], 10); 
    return { data: response.data, totalCount: totalUsers };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; 
  }
};


export const deleteUser = (userId) => {
  return axios.delete(`${API_URL}/${userId}`);
};

export const updateUser = (userId, userData) => {
  return axios.put(`${API_URL}/${userId}`, userData);
};

export const addUser = (userData) => {
  return axios.post(API_URL, userData);
};
