import axios from 'axios';

const API_URL = 'https://blogapitaskindrajala.onrender.com';

// Post a blog
const postBlog = async (blogData, token) => {
  const config = {
    headers: {
    
      Authorization: `Bearer ${token}`, 
    },
  };

  const response = await axios.post(`${API_URL}/blog`, blogData, config);
  return response.data;
};

// Get all blogs of a user
const getUserBlogs = async ( token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  };

  const response = await axios.get(`${API_URL}/blog`, config);
  return response.data;
};

const blogService = {
  postBlog,
  getUserBlogs,
};

export default blogService;
