// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

// ESM-compatible way to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: `../${__dirname}/.env` });

// Load environment variables from .env files
dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      PORT: process.env.PORT,
    },
    server: {
      port: parseInt(process.env.VITE_PORT) || 3000, // use the port from .env or default to 3000
    },
  },
});
