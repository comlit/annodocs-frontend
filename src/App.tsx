import './App.css';
import { Flex } from "@chakra-ui/react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import Search from "./pages/search/Search";
import Create from "./pages/create/Create";
import Edit from "./pages/edit/Edit";
import UploadLaw from './pages/upload/UploadLaw';

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./auth/thunks";

function App() {
    const dispatch = useDispatch();

    // At the start of the app, try to fetch the token
    useEffect(() => {
        // @ts-expect-error ts has some issue with the type. works like this
        dispatch(refreshToken());
    }, [dispatch]);

    return (
        <>
            <BrowserRouter>
                <Flex id='layout' minH='100vh' direction='column'>
                    <Header />
                        <Flex pb='65px' width='100%' height='100%' justifyContent={"center"}>
                        <Routes>
                            <Route index element={<Landing />} />
                            <Route path='/dashboard/*' element={<Dashboard />} />
                            <Route path='/search/*' element={<Search />} />
                            <Route path='/create/*' element={<Create />} />
                            <Route path='/editor/*' element={<Edit/>}/>
                            <Route path="/upload" element={<UploadLaw />} />
                        </Routes>
                    </Flex>
                    <Footer />
                </Flex>
            </BrowserRouter>
        </>
    );
}

export default App;
