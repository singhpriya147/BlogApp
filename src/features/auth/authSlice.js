
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
const user = JSON.parse(localStorage.getItem('user'));


// export const login = createAsyncThunk(
//   'auth/login',
//   async (userData, thunkAPI) => {
//     try {
//       return await authService.login(userData);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
// export const register = createAsyncThunk(
//   'auth/register',
//   async (userData, thunkAPI) => {
//     try {
//       return await authService.register(userData);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const deleteUser = createAsyncThunk(
//   'auth/deleteUser',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const token = getState().auth.user.token;

//       console.log('Token:', token);
//       if (!token) {
//         return rejectWithValue('Token is missing');
//       }
//       return await authService.deleteUser(token);
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(error.message);
//     }
//   }
// );



// export const getDetail = createAsyncThunk(
//   'auth/getDetail',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const token = getState().auth.user.token; 
      
      
//       if (!token) {
//         return rejectWithValue('Token is missing');
//       }
//       return await authService.getDetail(token);
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(error.message);
//     }
//   }
// );


export const getDetail = createAsyncThunk(
  'auth/getDetail',
  async (_, { rejectWithValue }) => {
    try {
      // Retrieve and parse the user object from localStorage
      const user = JSON.parse(localStorage.getItem('user'));

      // Check if the user object exists and has a token
      if (!user || !user.token) {
        return rejectWithValue('Token is missing');
      }

      // Pass the token to the authService
      return await authService.getDetail(user.token);
    } catch (error) {
      console.error(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);



export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      // Retrieve and parse the user object from localStorage
      const user = JSON.parse(localStorage.getItem('user'));

      // Check if the user object exists and has a token
      if (!user || !user.token) {
        return rejectWithValue('Token is missing');
      }

      // Pass the profile data and token to the authService
      return await authService.updateProfile(profileData, user.token);
    } catch (error) {
      console.error(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);


// export const deleteUser = createAsyncThunk(
//   'auth/deleteUser',
//   async (_, thunkAPI) => {
//     const token = localStorage.getItem('token'); // Get the token from localStorage
//     try {
//       const response = await authService.deleteUser(token); 
//       localStorage.removeItem('token'); 
     
//       return response.data;
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const updateProfile = createAsyncThunk(
//   'auth/updateProfile',
//   async (profileData, { getState, rejectWithValue }) => {
//     const token = getState().auth.user.token;
//     // Get the token from localStorage
//     if (!token) {
//       return rejectWithValue('No token found');
//     }

//     try {
//       const updatedProfile = await updateProfile(profileData, token); // Call the service function
//       return updatedProfile; // Return updated profile data on success
//     } catch (error) {
//       return rejectWithValue(error); // Return error message on failure
//     }
//   }
// );

export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout();
});



export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user?.token;
    try {
      return await authService.deleteUser(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);











const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: user ? user : null,
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
    clearUser: (state) => {
      state.user = null; // Clear user when account is deleted
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(getDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null; // Clear the user from state after successful deletion
        localStorage.removeItem('user'); // Remove user from localStorage
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;