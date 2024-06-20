import React, { useState } from "react";
import { Button, Typography, Snackbar, Alert } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";

const PublishSite = ({ selectedSite, selectedPage }) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");

  const handlePublish = async () => {
    try {
      await axiosInstance.post(`/sites/${selectedSite.id}/publish`);
      setStatus("Site published successfully!");
      setOpen(true);
    } catch (error) {
      console.error("Error publishing site:", error);
      setStatus("Failed to publish site");
      setOpen(true);
    }
  };

  const handleVisitPage = () => {
    const url = `http://${selectedSite.shortName}.webflow.io${selectedPage.publishedPath}`;
    window.open(url, "_blank");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="h6">Publish Site and Visit Page</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePublish}
        sx={{ mr: 2 }}
      >
        Publish
      </Button>
      <Button variant="contained" color="secondary" onClick={handleVisitPage}>
        Visit Page
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={status.includes("successfully") ? "success" : "error"}
        >
          {status}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PublishSite;
