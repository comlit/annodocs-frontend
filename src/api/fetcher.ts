import store from "../auth/store.ts";

const BACKEND_URL = import.meta.env.VITE_API_URL

/**
 *
 */
export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method: string) {
    return async (url: string, body?: object, needsAuth: boolean = true) => {
        const fullurl = BACKEND_URL + url;

        const headers = generateHeader(fullurl, method)
        if (needsAuth && !headers.has("Authorization"))
            return handleError(new Error("No auth token"))

        try {
            const response = await fetch(fullurl, {
                method,
                headers: headers,
                body: body ? JSON.stringify(body) : null
            })
            if (!response.ok)
                return handleError(new Error(response.statusText))
            return await response.json()
        } catch (e) {
            if (e instanceof Error)
                return handleError(e)
            return handleError(new Error("Unknown error"))
        }
    }
}

function handleError(error: Error) {
    console.log(error)
    return {message: error.message, payload: null}
}

function generateHeader(url: string, method: string) {
    //get token from redux store
    const token = store.getState().auth.token

    const header: HeadersInit = new Headers()
    if (token && url.startsWith(BACKEND_URL))
        header.set("Authorization", "Bearer " + token)
    if (method !== "GET")
        header.set("Content-Type", "application/json")

    return header
}
