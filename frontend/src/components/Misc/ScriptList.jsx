import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../utils/axiosInstance";
import { Box, Typography, Button, Divider } from "@mui/material";

/*
  - inLine script are infact hosted by webflow so when you "get scripts" every script will be hostedn
  - hosted scripts are passed through to the CDN
*/

const ScriptItem = ({ item }) => {
  console.log(item);
  const handleCopy = () => {
    if (item.hostedLocation) {
      navigator.clipboard.writeText(item.hostedLocation);
    } else if (item.sourceCode) {
      navigator.clipboard.writeText(item.sourceCode);
    }
  };

  return (
    <Box mb={2}>
      <Typography variant="h6">{item.displayName}</Typography>
      <Typography variant="body2">
        Created On: {new Date(item.createdOn).toLocaleString()}
      </Typography>
      <Typography variant="body2">Version: {item.version}</Typography>
      {item.hostedLocation && (
        <Typography variant="body2">
          Hosted Location:{" "}
          <a
            href={item.hostedLocation}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.hostedLocation}
          </a>
        </Typography>
      )}
      {item.sourceCode && (
        <Box>
          <Typography variant="body2">Source Code:</Typography>
          <Box component="pre">{item.sourceCode}</Box>
        </Box>
      )}
      {item.canCopy && (
        <Button variant="contained" onClick={handleCopy}>
          Copy
        </Button>
      )}
      <Divider sx={{ my: 2 }} />
    </Box>
  );
};

ScriptItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    canCopy: PropTypes.bool.isRequired,
    displayName: PropTypes.string.isRequired,
    sourceCode: PropTypes.string,
    hostedLocation: PropTypes.string,
    sourceCode: PropTypes.string,
    createdOn: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
  }).isRequired,
};

const GetRegisteredScripts = ({ selectedSiteId }) => {
  const [scripts, setScripts] = useState([]);

  useEffect(() => {
    if (selectedSiteId) {
      axiosInstance
        .get(`/custom-code/scripts/${selectedSiteId}`)
        .then((response) => {
          setScripts(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching scripts:", error);
        });
    }
  }, [selectedSiteId]);

  return (
    <Box>
      {scripts.map((script) => (
        <ScriptItem key={script.id} item={script} />
      ))}
    </Box>
  );
};

GetRegisteredScripts.propTypes = {
  selectedSiteId: PropTypes.string,
};

export default GetRegisteredScripts;
