import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

/**
 * async thunk to fetch access token and user data from server when the app starts
 * it assumes that a valid refresh token is present as a httpOnly cookie
 * if a valid refresh token is present, the promise will resolve with the access token and user data
 * if the refresh token is invalid or not present, the promise will reject
 */
export const refreshToken = createAsyncThunk("auth/fetchToken", async () => {
    //TODO: get access token and user data from server
    console.log("fetching token")
    return await fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.json())
})

/**
 * async thunk to login a user with email and password
 * if valid a refresh-token will be set as a httpOnly cookie from the server
 * if the login-data is valid, the promise will resolve with the access token and user data
 * if the login-data is invalid, the promise will reject
 */
export const login = createAsyncThunk("auth/login", async (credentials: { email: string, password: string, rememberMe: boolean }) => {
    console.log("logging in")
    console.log(credentials)
    return await fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.json())
})

/**
 * async thunk to register a user with email and password and other data
 * a refresh-token will be set as a httpOnly cookie from the server
 * if the server is available, the promise will resolve with the access token and user data
 * if the server is not available, the promise will reject
 */
export const register = createAsyncThunk("auth/register", async (credentials: { email: string, password: string, rememberMe: boolean }) => {
    console.log("logging in")
    console.log(credentials)
    return await fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => response.json())
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        isAuthenticated: false,
        isLoading: true,
        user: null,
    },
    reducers: {
        logout: (state) => {
            state.token = ''
            state.user = null
            state.isAuthenticated = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            console.log("fulfilled")
            //TODO: replace with real data
            state.token = action.payload.phone
            state.user = action.payload
            state.isAuthenticated = true
            state.isLoading = false
        })
        builder.addCase(refreshToken.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(refreshToken.rejected, (state) => {
            state.token = ''
            state.user = null
            state.isAuthenticated = false
            state.isLoading = false
        })

        builder.addCase(login.fulfilled, (state, action) => {
            console.log("fulfilled")
            //TODO: replace with real data
            state.token = action.payload.phone
            state.user = action.payload
            state.isAuthenticated = true
            state.isLoading = false
        })
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(login.rejected, (state) => {
            state.token = ''
            state.user = null
            state.isAuthenticated = false
            state.isLoading = false
        })

        builder.addCase(register.fulfilled, (state, action) => {
            console.log("fulfilled")
            //TODO: replace with real data
            state.token = action.payload.phone
            state.user = action.payload
            state.isAuthenticated = true
            state.isLoading = false
        })
        builder.addCase(register.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(register.rejected, (state) => {
            state.token = ''
            state.user = null
            state.isAuthenticated = false
            state.isLoading = false
        })

    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer