import React, { useState, useEffect, useRef } from "react";
import { Typography, Button } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";

const RegisterScripts = ({ selectedSite, example, onNext }) => {
  const [status, setStatus] = useState("");
  const isRegisteredRef = useRef({}); // Ref to track registration status by siteId and example
  const isRunning = useRef(false); // Ref to track if the effect is already running

  useEffect(() => {
    const registerScripts = async () => {
      if (!example || !selectedSite) {
        console.log(
          "Example or selectedSite not defined, skipping registration."
        );
        return; // Ensure example and selectedSite are defined
      }

      const key = `${selectedSite.id}-${example.slug}`;

      if (isRegisteredRef.current[key] || isRunning.current) {
        console.log(
          `Scripts already registered for ${key} or registration in progress.`
        );
        return; // Prevent duplicate registrations
      }

      console.log(`Registering scripts for ${key}`);
      isRunning.current = true;

      try {
        // Register Hosted Scripts
        for (const url of example.hostedScripts) {
          console.log(`Registering hosted script: ${url}`);
          await axiosInstance.post(
            `/custom-code/scripts/${selectedSite.id}/hosted`,
            {
              hostedLocation: url,
              version: "1.1.0",
              displayName: `${example.name}header`,
            }
          );
        }

        // Register Inline Script
        const response = await fetch(
          `http://localhost:8080/example-scripts/${example.inlineScript}`
        );
        const sourceCode = await response.text();
        console.log(`Registering inline script: ${example.inlineScript}`);
        await axiosInstance.post(
          `/custom-code/scripts/${selectedSite.id}/inline`,
          {
            sourceCode,
            canCopy: true,
            version: "1.1.0",
            displayName: `${example.name}footer`,
          }
        );

        setStatus("Scripts registered successfully!");
        isRegisteredRef.current[key] = true; // Mark as registered
      } catch (error) {
        console.error("Error registering scripts:", error);
        setStatus("Failed to register scripts");
      } finally {
        isRunning.current = false;
      }
    };

    registerScripts();
  }, [example, selectedSite]); // Dependencies

  return (
    <div>
      <Typography variant="h6">
        Registering Scripts for {example.name}
      </Typography>
      <Typography>{status}</Typography>
      <Button onClick={onNext} disabled={!status.includes("successfully")}>
        Next
      </Button>
    </div>
  );
};

export default RegisterScripts;
