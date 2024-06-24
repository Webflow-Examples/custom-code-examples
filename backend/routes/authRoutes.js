import express from "express";
import {
  handleRoot,
  startAuthFlow,
  handleAuthCallback,
} from "../controllers/authController.js";

const router = express.Router();

// Redirect root to Auth Screen
router.get("/", handleRoot);

// Route to start Auth Flow. Redirects to Webflow Auth screen
router.get("/auth", startAuthFlow);

// Callback URI to get code and access token
router.get("/auth/callback", handleAuthCallback);

export default router;
