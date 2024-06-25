// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Load environment variables from .env files
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export default defineConfig({
  define: {
    "process.env": {
      PORT: process.env.PORT,
    },
  },
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_PORT) || 3000, // use the port from .env or default to 3000
  },
});
