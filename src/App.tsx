import './App.css';
import { Flex} from "@chakra-ui/react";
import Header from "./layout/Header.tsx";
import Footer from "./layout/Footer.tsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/landing/Landing.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import Search from "./pages/search/Search.tsx";
import Create from "./pages/create/Create.tsx";
import Edit from "./pages/edit/Edit.tsx";
import HelpPage from "./pages/help/HelpPage.tsx";
import TourButton from "./layout/StartTourButton.tsx"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./auth/thunks.ts";
import { TourProvider } from './help_tour/TourContext';
import { Tour } from './help_tour/Tour';

function App() {
    const dispatch = useDispatch();
  
    // At the start of the app, try to fetch the token
    useEffect(() => {
      // @ts-expect-error ts has some problem with the type. works though
      dispatch(refreshToken());
    });
  
    const location = useLocation();
  
    // Determine the specific help page based on the current route
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
              </Routes>
              
            </Flex>
            
            <Footer />
          </Flex>
          </TourProvider>
      </>
    );
  }
  
  export default App;