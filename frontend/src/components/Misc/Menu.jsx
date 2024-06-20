import React, { useState } from "react";
import PropTypes from "prop-types";
import GetRegisteredScripts from "../ScriptList";
import InlineScriptUploader from "./InlineScriptUploader";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Sidebar = styled(Box)`
  width: 20%;
  border-right: 1px solid #ccc;
`;

const ContentArea = styled(Box)`
  width: 80%;
  padding: 16px;
`;

const Container = styled(Box)`
  display: flex;
`;

const VerticalMenuComponent = ({ siteId }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Container>
      <Sidebar>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem
            button
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemText primary="Get Registered Scripts" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText primary="Register Inline Script" />
          </ListItem>
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText primary="Register Hosted Script" />
          </ListItem>
        </List>
      </Sidebar>
      <ContentArea>
        {selectedIndex === 0 && (
          <GetRegisteredScripts selectedSiteId={siteId} />
        )}
        {selectedIndex === 1 && (
          <Box>
            <InlineScriptUploader selectedSiteId={siteId} type={"inline"} />
          </Box>
        )}
        {selectedIndex === 2 && (
          <Box>
            <InlineScriptUploader selectedSiteId={siteId} type={"hosted"} />
          </Box>
        )}
      </ContentArea>
    </Container>
  );
};

VerticalMenuComponent.propTypes = {
  siteId: PropTypes.string,
};

export default VerticalMenuComponent;
