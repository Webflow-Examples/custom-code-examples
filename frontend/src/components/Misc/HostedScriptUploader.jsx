import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  TextField,
  Box,
} from "@mui/material";

const HostedScriptUploader = ({ selectedSiteId }) => {
  const [scripts, setScripts] = useState([]); // List of available scripts
  const [selectedScript, setSelectedScript] = useState(""); // Currently selected script
  const [customScript, setCustomScript] = useState(""); // Custom script code entered by the user
  const [uploadStatus, setUploadStatus] = useState(""); // Upload status message
  const [sourceCode, setSourceCode] = useState(""); // Source code of the selected or custom script
  const [version, setVersion] = useState("1.0"); // Version of the script
  const [displayName, setDisplayName] = useState(""); // Display name of the script

  useEffect(() => {
    // Fetch the list of example scripts from the backend server
    const fetchScripts = async () => {
      try {
        const response = await axiosInstance.get("/examples/scripts");
        setScripts(response.data);
      } catch (error) {
        console.error("Error fetching scripts:", error);
      }
    };

    fetchScripts();
  }, []);

  const handleScriptChange = async (event) => {
    const selected = event.target.value;
    setSelectedScript(selected);

    if (selected === "customInline") {
      setSourceCode(customScript); // Use custom script if 'customInline' is selected
    } else {
      try {
        const scriptUrl = `http://localhost:8080/example-scripts/${selected}`; // Ensure this points to your backend
        console.log("Fetching script from URL:", scriptUrl);
        const response = await fetch(scriptUrl);
        console.log("Response status:", response.status);
        if (response.ok) {
          const sourceCode = await response.text();
          console.log("Fetched source code:", sourceCode);
          setSourceCode(sourceCode); // Fetch and set source code for selected script
        } else {
          console.error("Error fetching script:", response.statusText);
          setUploadStatus("Error fetching script.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setUploadStatus("Error fetching script.");
      }
    }
  };

  const handleCustomScriptChange = (event) => {
    const customCode = event.target.value;
    setCustomScript(customCode);

    if (selectedScript === "customInline") {
      setSourceCode(customCode); // Update source code if custom script is being edited
    }
  };

  const handleUpload = async () => {
    if (!selectedScript) {
      setUploadStatus("Please select a script to upload.");
      return;
    }

    try {
      const payload = {
        hostedLocation: sourceCode,
        canCopy: true,
        version: version,
        displayName: displayName,
      };

      console.log(payload);

      await axiosInstance.post(
        `/custom-code/scripts/${selectedSiteId}/hosted`,
        payload
      );
      setUploadStatus("Script uploaded successfully!");
    } catch (error) {
      console.error("Error uploading script:", error);
      setUploadStatus("Error uploading script.");
    }
  };

  return (
    <div>
      <Typography variant="h6">Upload Script to Webflow</Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="script-select-label">Select Script</InputLabel>
        <Select
          labelId="script-select-label"
          value={selectedScript}
          onChange={handleScriptChange}
        >
          {scripts.map((script) => (
            <MenuItem key={script} value={script}>
              {script}
            </MenuItem>
          ))}
          <MenuItem value="customInline">Custom Inline Script</MenuItem>
        </Select>
      </FormControl>

      {selectedScript === "customInline" && (
        <Box margin="normal">
          <TextField
            fullWidth
            label="Custom Script"
            multiline
            rows={10}
            variant="outlined"
            value={customScript}
            onChange={handleCustomScriptChange}
          />
        </Box>
      )}

      <FormControl fullWidth margin="normal">
        <TextField
          label="Version"
          variant="outlined"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Display Name"
          variant="outlined"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload Script
      </Button>
      {uploadStatus && <Typography variant="body2">{uploadStatus}</Typography>}
    </div>
  );
};

export default HostedScriptUploader;
