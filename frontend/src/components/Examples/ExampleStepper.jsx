import React, { useState } from "react";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
} from "@mui/material";
import ChooseExample from "./ChooseExample";
import RegisterScripts from "./RegisterScripts";
import ChoosePage from "./ChoosePage";
import ApplyScript from "./ApplyScript";
import PublishSite from "./PublishSite";

const steps = [
  "Choose a code example",
  "Register Scripts",
  "Choose a page",
  "Apply script to page",
  "Publish page",
];

const ExampleStepper = ({ selectedSite }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedExample, setSelectedExample] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);

  const handleNext = () => {
    // Add necessary checks before advancing to the next step
    if (
      (activeStep === 0 && !selectedExample) ||
      (activeStep === 2 && !selectedPage)
    ) {
      return; // Prevent advancing if conditions are not met
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedExample(null);
    setSelectedPage(null);
  };

  const handleExampleSelect = (example) => {
    setSelectedExample(example);
    setActiveStep(1); // Move to the next step immediately after selection
  };

  const handlePageSelect = (page) => {
    setSelectedPage(page);
    setActiveStep(3); // Move to the next step immediately after selection
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <Box sx={{ mt: 2, mb: 1 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      ) : (
        <Box>
          <Box sx={{ mt: 2, mb: 1 }}>
            {activeStep === 0 && (
              <ChooseExample onSelect={handleExampleSelect} />
            )}
            {activeStep === 1 && (
              <RegisterScripts
                selectedSite={selectedSite}
                example={selectedExample}
                onNext={handleNext}
              />
            )}
            {activeStep === 2 && (
              <ChoosePage
                selectedSite={selectedSite}
                onPageSelect={handlePageSelect}
                onNext={handleNext}
              />
            )}
            {activeStep === 3 && (
              <ApplyScript
                selectedSite={selectedSite}
                selectedPage={selectedPage}
                example={selectedExample}
                onNext={handleNext}
              />
            )}
            {activeStep === 4 && (
              <PublishSite
                selectedSite={selectedSite}
                selectedPage={selectedPage}
              />
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            {activeStep !== 0 && activeStep !== 2 && (
              <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ExampleStepper;
