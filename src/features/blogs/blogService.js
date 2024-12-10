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


const deleteBlog = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', 
    },
  };

  const body = {
    id: id, 
  };

  console.log(body);
  const response = await axios.delete(`${API_URL}/blog`, {
    data: body,
    ...config,
  });
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
  deleteBlog,
};

export default blogService;
