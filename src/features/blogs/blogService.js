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



// const editBlog = async (id, updatedData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json', // Ensure JSON content type
//     },
//   };

//   try {
//     const response = await axios.put(
//       `${API_URL}/blog`,
//       updatedData,
//       config
//     );
//     return response.data; // Return the updated blog data
//   } catch (error) {
//     console.error('Error editing blog:', error);
//     throw error;
//   }
// };

const editBlog = async (id, updatedData, token) => {
  const formData = new FormData();

  // Append fields to formData (only append fields that exist)
  if (updatedData.title) formData.append('title', updatedData.title);
  if (updatedData.description)
    formData.append('description', updatedData.description);
  if (updatedData.selectedFile)
    formData.append('image', updatedData.selectedFile);

  // Append the ID of the blog to be updated (this will go in the body, not as a query param)
  formData.append('id', id);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Content type for file uploads (handled by FormData)
    },
  };

  try {
    // Send FormData with id and other data in the request body
    const response = await axios.put(`${API_URL}/blog`, formData, config);
    return response.data; // Return the updated blog data
  } catch (error) {
    console.error('Error editing blog:', error);
    throw error;
  }
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
  editBlog,
};

export default blogService;
