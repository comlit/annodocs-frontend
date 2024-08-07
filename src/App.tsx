

import './App.css';
import { Flex } from "@chakra-ui/react";
import Header from "./layout/Header.tsx";
import Footer from "./layout/Footer.tsx";
import { Route, Routes, useLocation} from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import Search from "./pages/search/Search";
import Create from "./pages/create/Create";
import Edit from "./pages/edit/Edit";
import HelpPage from "./pages/help/HelpPage.tsx";
import TourButton from "./layout/StartTourButton.tsx";
import UploadLaw from './pages/upload/UploadLaw';

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./auth/thunks";
import { TourProvider } from './help_tour/TourContext';
import { Tour } from './help_tour/Tour';


function App() {
    const dispatch = useDispatch();

    // At the start of the app, try to fetch the token
    useEffect(() => {
        // @ts-expect-error ts has some issue with the type. works like this
        dispatch(refreshToken());
    }, [dispatch]);

    const location = useLocation();

    const getSpecificHelpPage = (pathname: string) => {
        if (pathname.startsWith("/dashboard")) return "dashboard";
        if (pathname.startsWith("/search")) return "Suche";
        if (pathname.startsWith("/editor")) return "edit";
        if (pathname.startsWith("/upload")) return "upload";
        return "";
      };
      const pages = [
        { name: "Anmeldung", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Rechtsnormen suchen", path: "/search" },
        { name: "Annotationen editieren", path: "/editor" },
        { name: "Gesetze hinzufügen", path: "/upload" }
      ];
      const specificHelpPage = getSpecificHelpPage(location.pathname);

      return (
        <>
        <TourProvider>
            <Flex id="layout" minH="100vh" direction="column">
              <Header pages = {pages} specificHelpPage={specificHelpPage}/>
              
                {location.pathname !== '/help' && location.pathname!=='/'  &&<TourButton />}
  
              <Tour />
              
              <Flex pb="65px" width="100%">
                
          
                <Routes>
                  
                  <Route index element={<Landing />} />
                  <Route path="/dashboard/*" element={<Dashboard />} />
                  <Route path="/search/*" element={<Search />} />
                  <Route path="/create/*" element={<Create />} />
                  <Route path="/editor/*" element={<Edit />} />
                  <Route path="/help/*" element={<HelpPage />} />
                  <Route path="/upload" element={<UploadLaw />} />
                </Routes>
                
              </Flex>
              
              <Footer />
            </Flex>
            </TourProvider>
        </>
      );
    }
    
    export default App;
