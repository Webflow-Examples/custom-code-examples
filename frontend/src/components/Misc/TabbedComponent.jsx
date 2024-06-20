import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { styled } from "@mui/system";
import VerticalMenuComponent from "./Misc/Menu";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

const StyledTabs = styled(Tabs)`
  background-color: #f5f5f5;
`;

const TabbedComponent = ({ siteId }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Registered Scripts" id="tab-0" aria-controls="tabpanel-0" />
        <Tab label="Site Custom Code" id="tab-1" aria-controls="tabpanel-1" />
        <Tab label="Page Custom Code" id="tab-2" aria-controls="tabpanel-2" />
      </StyledTabs>
      <TabPanel value={value} index={0}>
        <VerticalMenuComponent siteId={siteId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box>
          <Typography variant="h6">Site Custom Code Options</Typography>
          {/* Add more options here */}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box>
          <Typography variant="h6">Page Custom Code Options</Typography>
          {/* Add more options here */}
        </Box>
      </TabPanel>
    </Box>
  );
};

TabbedComponent.propTypes = {
  siteId: PropTypes.string,
};

export default TabbedComponent;
