import React, { useState, useEffect } from "react";
import { Typography, Button, Box, Snackbar, Alert } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";

const ScriptItem = ({ script, type, onRegister, isRegistered }) => {
  return (
    <Box mb={2}>
      <Typography variant="body1">{script.displayName || script}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onRegister(script, type)}
        disabled={isRegistered}
      >
        {isRegistered ? "Registered" : "Register"}
      </Button>
    </Box>
  );
};

const RegisterScripts = ({ selectedSite, example, onNext }) => {
  const [status, setStatus] = useState("");
  const [registeredScripts, setRegisteredScripts] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleRegisterScript = async (script, type) => {
    try {
      let response;
      if (type === "hosted") {
        response = await axiosInstance.post(
          `/custom-code/scripts/${selectedSite.id}/hosted`,
          {
            hostedLocation: script,
            version: "1.1.0",
            displayName: `${example.name}header`,
          }
        );
      } else if (type === "inline") {
        const inlineResponse = await fetch(
          `http://localhost:8080/example-scripts/${script}`
        );
        const sourceCode = await inlineResponse.text();
        response = await axiosInstance.post(
          `/custom-code/scripts/${selectedSite.id}/inline`,
          {
            sourceCode,
            canCopy: true,
            version: "1.1.0",
            displayName: `${example.name}footer`,
          }
        );
      }
      setRegisteredScripts((prev) => ({
        ...prev,
        [script]: true,
      }));
      setStatus(`Script ${script} registered successfully!`);
      setSnackbarMessage(`Script ${script} registered successfully!`);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error registering script:", error);
      setStatus(`Failed to register script ${script}`);
      setSnackbarMessage(`Failed to register script ${script}`);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <Typography variant="h6">Register Scripts for {example.name}</Typography>
      {example.hostedScripts.map((script) => (
        <ScriptItem
          key={script}
          script={script}
          type="hosted"
          onRegister={handleRegisterScript}
          isRegistered={registeredScripts[script]}
        />
      ))}
      <ScriptItem
        key={example.inlineScript}
        script={example.inlineScript}
        type="inline"
        onRegister={handleRegisterScript}
        isRegistered={registeredScripts[example.inlineScript]}
      />
      <Typography>{status}</Typography>
      <Button
        onClick={onNext}
        disabled={!Object.keys(registeredScripts).length}
      >
        Next
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterScripts;
