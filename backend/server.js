import express from "express";
import cors from "cors";
import path from "path";
import chalk from "chalk";
import { fileURLToPath } from "url";
import { startNgrok } from "./utils/ngrokManager.js";
import Table from "cli-table3";

// Import Webflow Client Middleware
import webflowClientMiddleware from "./webflowClientMiddleware.js";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import sitesRoutes from "./routes/sitesRoutes.js";
import scriptRoutes from "./routes/scriptRoutes.js";
import examplesRoutes from "./routes/exampleRoutes.js";

// Setup App
const app = express();
const PORT = process.env.PORT || 8000;

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express Options
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only this origin to access the resources
    optionsSuccessStatus: 200, // For legacy browser support
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the public directory

// Serve example scripts from a specific directory
app.use(
  "/example-scripts",
  express.static(path.join(__dirname, "public/example-scripts"))
);

// Setup Routes
app.use("/", authRoutes);
app.use("/api/sites", webflowClientMiddleware, sitesRoutes);
app.use("/api/custom-code", webflowClientMiddleware, scriptRoutes);
app.use("/api/examples", examplesRoutes);

// Start server with NGROK
const startServer = async () => {
  try {
    // Start Ngrok
    const ngrokUrl = await startNgrok(PORT);

    // Create a table to output in the CLI
    const table = new Table({
      head: ["Location", "URL"], // Define column headers
      colWidths: [30, 60], // Define column widths
    });

    // Add URL information to the table
    table.push(
      ["Development URL (Frontend)", "http://localhost:3000"],
      ["Development URL (Backend)", `http://localhost:${PORT}`]
    );

    // If using an App, also add the Redirect URI to the table
    if (!process.env.SITE_TOKEN) {
      table.push(["Redirect URI", `${ngrokUrl}/auth/callback`]);
    }

    // Console log the table
    console.log(table.toString());

    // If using an App, send a note to adjust the app's Redirect URI
    if (!process.env.SITE_TOKEN) {
      console.log(
        chalk.blue.inverse("\n\nNOTE:"),
        chalk.blue("Update your Redirect URI in your App Settings\n\n")
      );
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server with ngrok:", error);
    process.exit(1);
  }
};

startServer();
