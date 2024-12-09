// import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import authService from "./authService";
// const user = JSON.parse(localStorage.getItem('user'));


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


// export const getDetail = createAsyncThunk(
//   'auth/getDetail',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const token = getState().auth.user.token; 
    
//       return await authService.getDetail(token);
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(error.message);
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

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: user ? user : null,
   
//     isLoading: false,
//     isError: false,
//     isSuccess: false,
//     message: '',
//   },
//   reducers: {
//     reset: (state) => {
//       state.isLoading = false;
//       state.isError = false;
//       state.isSuccess = false;
//       state.message = '';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         state.user = null;
//       })
//       .addCase(login.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         state.user = null;
//       })
//       .addCase(getDetail.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getDetail.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//       })
//       .addCase(getDetail.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         state.user = null;
//       })
//       .addCase(updateProfile.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(updateProfile.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//       })
//       .addCase(updateProfile.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         state.user = null;
//       });
//   },
// });

// export const { reset } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
const user = JSON.parse(localStorage.getItem('user'));


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


export const getDetail = createAsyncThunk(
  'auth/getDetail',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.token; 
      
      console.log('Token:', token);
      if (!token) {
        return rejectWithValue('Token is missing');
      }
      return await authService.getDetail(token);
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { getState, rejectWithValue }) => {
    const token = getState().auth.user.token;
    // Get the token from localStorage
    if (!token) {
      return rejectWithValue('No token found');
    }

    try {
      const updatedProfile = await updateProfile(profileData, token); // Call the service function
      return updatedProfile; // Return updated profile data on success
    } catch (error) {
      return rejectWithValue(error); // Return error message on failure
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
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;