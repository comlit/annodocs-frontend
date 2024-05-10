import {createSlice} from '@reduxjs/toolkit'
import {login, refreshToken, register} from "./thunks.ts";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: '',
        isAuthenticated: false,
        isLoading: false,
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
            //TODO: replace with real data
            state.token = action.payload.payload
            //state.user = action.payload.user
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
            state.token = action.payload.payload
            //state.user = action.payload
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
            if (action.payload.message === "success") {
                state.token = action.payload.payload
                state.isAuthenticated = true
                //state.user = action.payload.user
            }
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