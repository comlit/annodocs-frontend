import './App.css'
import {Flex} from "@chakra-ui/react";
import Header from "./layout/Header.tsx";
import Footer from "./layout/Footer.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./pages/landing/Landing.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Search from "./pages/pages/Search.tsx";
import Create from "./pages/create/Create.tsx";
import Edit from "./pages/edit/Edit.tsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {refreshToken} from "./auth/thunks.ts";

function App() {
    const dispatch = useDispatch()

    //at the start of the app, try to fetch the token
    useEffect(() => {
        // @ts-expect-error ts hat irgendein problem mit dem type. funktioniert aber so
        dispatch(refreshToken())
    })
    return (
        <>
                <BrowserRouter>
                    <Flex id='layout' minH='100vh' direction='column'>
                        <Header/>
                        <Flex pb='65px' width='100%'>
                            <Routes>
                                <Route index element={<Landing/>}/>
                                <Route path='/dashboard/*' element={<Dashboard/>}/>
                                <Route path='/search/*' element={<Search/>}/>
                                <Route path='/create/*' element={<Create/>}/>
                                <Route path='/edit/*' element={<Edit/>}/>
                            </Routes>
                        </Flex>
                        <Footer/>
                    </Flex>
                </BrowserRouter>
        </>
    )
}

export default App
