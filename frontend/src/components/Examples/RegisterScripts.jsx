import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  TextField,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/system";
import axiosInstance from "../../utils/axiosInstance";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

const ScriptItem = ({
  script,
  type,
  onRegister,
  isRegistered,
  inlineScriptContent,
  index,
}) => {
  const displayNameRef = useRef("");
  const versionRef = useRef("");
  const [canCopy, setCanCopy] = useState(true);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:
      index % 2 !== 0 ? theme.palette.action.hover : "transparent",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }));

  const Pill = styled("span")(({ theme, type }) => ({
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "12px",
    backgroundColor:
      type === "hosted" ? theme.palette.success.main : theme.palette.info.main,
    color: "#fff",
    marginLeft: theme.spacing(1),
    fontSize: "0.75rem",
  }));

  const inputProps = {
    style: {
      width: "50%",
    },
  };

  const handleRegister = () => {
    const displayName = displayNameRef.current.value;
    const version = versionRef.current.value;
    onRegister(script, type, displayName, version, canCopy);
  };

  return (
    <Item>
      <Typography variant="body1">
        {script.displayName || script}
        <Pill type={type}>{type === "hosted" ? "Hosted" : "Inline"}</Pill>
      </Typography>
      <TextField
        label="Script Name"
        inputRef={displayNameRef}
        margin="normal"
        disabled={isRegistered}
        inputProps={inputProps}
      />
      <TextField
        label="Version"
        inputRef={versionRef}
        margin="normal"
        disabled={isRegistered}
        inputProps={inputProps}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={canCopy}
            onChange={(e) => setCanCopy(e.target.checked)}
            disabled={isRegistered}
          />
        }
        label="Can Copy"
      />
      {type === "inline" && inlineScriptContent && (
        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: 1,
            padding: 2,
            backgroundColor: "#f5f5f5",
            marginTop: 2,
          }}
        >
          <Typography variant="body2">Inline Script Content:</Typography>
          <SyntaxHighlighter language="javascript" style={vs}>
            {inlineScriptContent}
          </SyntaxHighlighter>
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleRegister}
        disabled={isRegistered}
      >
        {isRegistered ? "Registered" : "Register"}
      </Button>
    </Item>
  );
};

const RegisterScripts = ({ selectedSite, example, onNext }) => {
  const [status, setStatus] = useState("");
  const [registeredScripts, setRegisteredScripts] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [inlineScriptContent, setInlineScriptContent] = useState("");

  useEffect(() => {
    if (example.inlineScript) {
      fetch(
        `http://localhost:${process.env.PORT}/example-scripts/${example.inlineScript}`
      )
        .then((response) => response.text())
        .then((data) => setInlineScriptContent(data))
        .catch((error) =>
          console.error("Error fetching inline script content:", error)
        );
    }
  }, [example.inlineScript]);

  const handleRegisterScript = async (
    script,
    type,
    displayName,
    version,
    canCopy
  ) => {
    try {
      let response;
      if (type === "hosted") {
        response = await axiosInstance.post(
          `/custom-code/scripts/${selectedSite.id}/hosted`,
          {
            hostedLocation: script,
            version: version || "1.0.0",
            displayName: displayName || `${example.name} Hosted Script`,
            canCopy,
          }
        );
      } else if (type === "inline") {
        response = await axiosInstance.post(
          `/custom-code/scripts/${selectedSite.id}/inline`,
          {
            sourceCode: inlineScriptContent,
            canCopy,
            version: version || "1.0.0",
            displayName: displayName || `${example.name} Inline Script`,
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
      {example.hostedScripts.map((script, index) => (
        <ScriptItem
          key={script}
          script={script}
          type="hosted"
          onRegister={handleRegisterScript}
          isRegistered={registeredScripts[script]}
          index={index}
        />
      ))}
      <ScriptItem
        key={example.inlineScript}
        script={example.inlineScript}
        type="inline"
        onRegister={handleRegisterScript}
        isRegistered={registeredScripts[example.inlineScript]}
        inlineScriptContent={inlineScriptContent}
        index={example.hostedScripts.length} // Ensure unique index
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
        <Alert
          onClose={handleCloseSnackbar}
          severity={status.includes("successfully") ? "success" : "error"}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterScripts;
