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

function App() {

    return (
        <>
                <BrowserRouter>
                    <Flex id='layout' minH='100vh' direction='column'>
                        <Header/>
                        <Routes>
                            <Route index element={<Landing/>}/>
                            <Route path='/dashboard/*' element={<Dashboard/>}/>
                            <Route path='/search/*' element={<Search/>}/>
                            <Route path='/create/*' element={<Create/>}/>
                            <Route path='/edit/*' element={<Edit/>}/>
                        </Routes>
                        <Footer/>
                    </Flex>
                </BrowserRouter>
        </>
    )
}

export default App
