import axios from 'axios';
const API_URL = 'https://blogapitaskindrajala.onrender.com';

const login = async (userData) => {
   try {
     const response = await axios.post(`${API_URL}/login`, userData);
     console.log('Response:', response); // Log the API response
     return response.data;
   } catch (error) {
     console.error('Error:', error.response); // Log the error response
     throw error;
   }
};

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log('Response:', response);
    return response.data;
  } catch (error) {
    console.error('Error:', error.response);
    throw error;
  }
};

const authService={
 login,
 register,
}
export default authService
