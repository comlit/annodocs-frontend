import { IconButton, Tab, TabList, TabPanel, TabPanels, Tabs, CloseButton } from "@chakra-ui/react";
import Edit from "./Edit.tsx";
import { useState, useEffect } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";

function Editor() {
  const [tabs, setTabs] = useState(['Tab 1', 'Tab 2']);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tab = location.pathname.split("/").pop();
    if (tab && !tabs.includes(tab)) {
      setTabs([...tabs, tab]);
    }
  }, [location]);

  const handleAddTab = () => {
    const newTab = `Tab ${tabs.length + 1}`;
    setTabs([...tabs, newTab]);
    navigate(newTab);
  };

  const handleCloseTab = (indexToRemove) => {
    setTabs(tabs.filter((tab, index) => index !== indexToRemove));
    if (tabs[indexToRemove] === location.pathname.split("/").pop()) {
      navigate(tabs[indexToRemove - 1] || "");
    }
  };

  return (
    <Tabs>
      <TabList>
        {tabs.map((tab, index) => (
          <Tab key={index} onClick={() => navigate(tab)}>
            {tab}
            <CloseButton size="sm" onClick={(e) => {
              e.stopPropagation(); // Prevent tab switch
              handleCloseTab(index);
            }} />
          </Tab>
        ))}
        <IconButton aria-label="Add tab" icon={<AddIcon />} onClick={handleAddTab} />
      </TabList>

      <TabPanels>
        {tabs.map((tab, index) => (
          <TabPanel key={index}>
            <Edit />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default Editor;