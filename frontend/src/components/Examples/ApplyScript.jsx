import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../utils/axiosInstance";
import {
  Box,
  Typography,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";

const ScriptItem = ({ item, onApply }) => {
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
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={() => onApply(item, "header")}>
          Apply to Header
        </Button>
        <Button variant="contained" onClick={() => onApply(item, "footer")}>
          Apply to Footer
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
    </Box>
  );
};

ScriptItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    sourceCode: PropTypes.string,
    hostedLocation: PropTypes.string,
    createdOn: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
  }).isRequired,
  onApply: PropTypes.func.isRequired,
};

const ApplyScript = ({ selectedSite, selectedPage, onNext }) => {
  const [scripts, setScripts] = useState([]);
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (selectedSite) {
      axiosInstance
        .get(`/custom-code/scripts/${selectedSite.id}`)
        .then((response) => {
          setScripts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching scripts:", error);
        });
    }
  }, [selectedSite]);

  const handleApply = async (script, location) => {
    try {
      await axiosInstance.put(
        `/custom-code/pages/${selectedPage.id}/upsertCustomCode?location=${location}`,
        {
          selectedScript: script.id,
          version: script.version,
        }
      );
      setScripts((prevScripts) =>
        prevScripts.filter((s) => s.id !== script.id)
      );
      setStatus("Script applied successfully!");
      setOpen(true);
    } catch (error) {
      console.error("Error applying script:", error);
      setStatus("Failed to apply script");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Typography variant="h6">Apply Script to Page</Typography>
      <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
        {scripts.length === 0 ? (
          <Typography>No scripts available</Typography>
        ) : (
          scripts.map((script) => (
            <ScriptItem key={script.id} item={script} onApply={handleApply} />
          ))
        )}
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={status.includes("successfully") ? "success" : "error"}
        >
          {status}
        </Alert>
      </Snackbar>
    </Box>
  );
};

ApplyScript.propTypes = {
  selectedSite: PropTypes.object.isRequired,
  selectedPage: PropTypes.object.isRequired,
  onNext: PropTypes.func.isRequired,
};

export default ApplyScript;
