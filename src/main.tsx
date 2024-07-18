import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ChakraProvider, theme} from '@chakra-ui/react'
import {Provider} from "react-redux";
import store from "./auth/store.ts"
import {BrowserRouter} from "react-router-dom";
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider theme={theme}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
            </ChakraProvider>
        </Provider>
    </React.StrictMode>,
)
