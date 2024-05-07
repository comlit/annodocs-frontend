import {createAsyncThunk} from "@reduxjs/toolkit";
const BACKEND_URL = import.meta.env.VITE_API_URL

/**
 * async thunk to fetch access token and user data from server when the app starts
 * it assumes that a valid refresh token is present as a httpOnly cookie
 * if a valid refresh token is present, the promise will resolve with the access token and user data
 * if the refresh token is invalid or not present, the promise will reject
 */
export const refreshToken = createAsyncThunk("auth/fetchToken", async () => {
    return post('api/v1/user/refresh', null)
})

/**
 * async thunk to log in a user with email and password
 * if valid a refresh-token will be set as a httpOnly cookie from the server
 * if the login-data is valid, the promise will resolve with the access token and user data
 * if the login-data is invalid, the promise will reject
 */
export const login = createAsyncThunk("auth/login", async (credentials: { email: string, password: string, rememberMe: boolean }) => {
    return post('api/v1/user/login', credentials)
})

/**
 * async thunk to register a user with email and password and other data
 * a refresh-token will be set as a httpOnly cookie from the server
 * if the server is available, the promise will resolve with the access token and user data
 * if the server is not available, the promise will reject
 */
export const register = createAsyncThunk("auth/register", async (credentials: { email: string, password: string, rememberMe: boolean, name: string, surname: string, state: string }) => {
    return post('api/v1/user/create', credentials)
})

async function post(url: string, body: object | null) {
    const fullurl = BACKEND_URL + url;

    const header: HeadersInit = new Headers()
    header.set("Content-Type", "application/json")
    const response = await fetch(fullurl, {
        method: 'POST',
        headers: header,
        body: body ? JSON.stringify(body) : null,
        credentials: 'include'
    })
    if (!response.ok)
        throw new Error(response.statusText)
    return await response.json()
}


