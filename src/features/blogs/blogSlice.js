import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from './blogService';

  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;


// Async thunk for posting a blog
export const postBlog = createAsyncThunk(
  'blog/post',
  async ( blogData, { rejectWithValue }) => {
    try {
      return await blogService.postBlog(blogData, token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for fetching all blogs of a user
export const getUserBlogs = createAsyncThunk(
  'blog/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await blogService.getUserBlogs( token);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const editBlogById = createAsyncThunk(
  'blogs/editBlog', // Action name
  async ({ id, updatedData, token }, { rejectWithValue }) => {
    try {
      const response = await editBlog(id, updatedData, token);
      return response; // Return the updated blog data to update the state
    } catch (error) {
      return rejectWithValue(error.message); // If error, reject with error message
    }
  }
);

export const deleteBlogById = createAsyncThunk(
  'blogs/deleteBlog',
  async ( id, { rejectWithValue }) => {
    try {
      console.log(id);
     return  await blogService.deleteBlog(id,token);
     
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Post Blog
      .addCase(postBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs.push(action.payload);
      })
      .addCase(postBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get User Blogs
      .addCase(getUserBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getUserBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBlogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      })
      .addCase(deleteBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editBlogById.pending, (state) => {
        state.loading = true;  // Set loading to true while editing
        state.error = null;
      })
      .addCase(editBlogById.fulfilled, (state, action) => {
        state.loading = false;  // Set loading to false after success
        const updatedBlog = action.payload;
        state.blogs = state.blogs.map(blog =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        );  // Replace the old blog with the updated blog in the state
        state.currentBlog = updatedBlog;  // Optionally, update the current blog
      })
      .addCase(editBlogById.rejected, (state, action) => {
        state.loading = false;  // Set loading to false after failure
        state.error = action.payload;  // Set the error message
      });
  },
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;
