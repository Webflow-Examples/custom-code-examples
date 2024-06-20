import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const codeExamples = [
  {
    name: "Pointer Tracking",
    slug: "pointer-tracking",
    hostedScripts: [
      "https://cdn.jsdelivr.net/npm/@rive-app/canvas@latest/rive.js",
    ],
    inlineScript: "pointer-tracking.js",
  },
  {
    name: "Price Range Selector",
    slug: "price-range-selector",
    hostedScripts: [
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/js/ion.rangeSlider.min.js",
    ],
    inlineScript: "price-range-selector.js",
  },
  {
    name: "Form URL Params",
    slug: "form-prefill",
    hostedScripts: [
      "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
    ],
    inlineScript: "url-params.js",
  },
];

const ChooseExample = ({ onSelect }) => {
  return (
    <div>
      <Typography variant="h6">Choose a Code Example</Typography>
      <List>
        {codeExamples.map((example) => (
          <ListItem button key={example.slug} onClick={() => onSelect(example)}>
            <ListItemText primary={example.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ChooseExample;
