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
      });
  },
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;
