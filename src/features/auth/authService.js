// import axios from 'axios';
// const API_URL = 'https://blogapitaskindrajala.onrender.com';

// const login = async (userData) => {
//    try {
//      const response = await axios.post(`${API_URL}/login`, userData);
//      console.log('Response:', response); // Log the API response
//      return response.data;
//    } catch (error) {
//      console.error('Error:', error.response); // Log the error response
//      throw error;
//    }
// };

// const register = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/register`, userData);
//     console.log('Response:', response);
//     return response.data;
//   } catch (error) {
//     console.error('Error:', error.response);
//     throw error;
//   }
// };

// const getDetail=async(token)=>{
//   try {
//    const response = await axios.get(`${API_URL}/profile`, {
//      headers: {
//        Authorization: `Bearer ${token}`,
//      },
//    });
//    console.log(response.data);
//    return response.data; 
//   } catch (error) {
//     console.error('Error:', error.response);
//     throw error;
//   }
// }

// const deleteUser = async (token) => {
//   try {
//     const response = await axios.delete(`${API_URL}/profile`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error:', error.response);
//     throw error;
//   }
// };

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





import axios from 'axios';

 const API_URL = 'https://blogapitaskindrajala.onrender.com'

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  console.log(response.data);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data)); // Save user data to localStorage
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  console.log(response.data);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data)); // Save user data to localStorage
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Delete user account
const deleteUser = async (token) => {
  const response = await axios.delete(`${API_URL}/delete`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 200) {
    localStorage.removeItem('user');
  }
  return response.data;
};

// Get user details
const getDetail = async (token) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};





export default {
  register,
  login,
  logout,
  deleteUser,
  getDetail,
  updateProfile
};
