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

const getDetail=async(token)=>{
  try {
   const response = await axios.get(`${API_URL}/profile`, {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   });
   console.log(response.data);
   return response.data; 
  } catch (error) {
    console.error('Error:', error.response);
    throw error;
  }
}

const updateProfile = async (ProfileData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axios.put(`${API_URL}/profile`, ProfileData,config
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error.response);
    throw error;
  }
};

const authService={
 login,
 register,
 getDetail,
 updateProfile,
}
export default authService
