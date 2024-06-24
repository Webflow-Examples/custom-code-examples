import { WebflowClient } from "webflow-api";
import { getNgrokUrl } from "../utils/ngrokManager.js";
import { storeToken, getToken } from "../auth/tokens.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Convert URL to local file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get Environment Variables from .env file in route
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Include scopes for your App. Be sure your App has been registered with the same scopes.
const scopes = [
  "sites:read",
  "sites:write",
  "pages:write",
  "pages:read",
  "pages:write",
  "custom_code:read",
  "custom_code:write",
];

// Handle navigation to the root
export const handleRoot = async (req, res) => {
  try {
    // Get a token from .db
    const token = await getToken("user");

    // If no token found, redirect user to the Auth Screen
    if (!token) {
      console.log("No token found. Redirecting to auth screen...");
      return res.redirect("/auth");
    } else {
      // If token found, redirect user to the frontend
      console.log("Token found. Redirecting to frontend");
      return res.redirect("http://localhost:3000");
    }
  } catch (error) {
    console.error("Error handling token:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Start authorization flow
export const startAuthFlow = async (req, res) => {
  try {
    const siteToken = process.env.SITE_TOKEN;

    // If a site token is included in the .env file , store the token and bypass the auth screen
    if (siteToken) {
      await storeToken("user", siteToken);
      console.log("Site token found and stored.");
      return res.redirect("http://localhost:3000");
    } else {
      // If the site token is not included in the .env file, use the Webflow Client ID to create an authorization URL
      const publicUrl = await getNgrokUrl();
      const authorizeUrl = WebflowClient.authorizeURL({
        scope: scopes,
        clientId: process.env.WEBFLOW_CLIENT_ID,
        redirectUri: `${publicUrl}/auth/callback`,
      });

      // Redirect the user to the Auth URL
      return res.redirect(authorizeUrl);
    }
  } catch (error) {
    console.error("Error starting auth flow:", error);
    res.status(500).send("Failed to start auth flow");
  }
};

// Handle Callback from Authorization Screen
export const handleAuthCallback = async (req, res) => {
  // Get the Authorization Code from the query parameters
  const { code } = req.query;
  if (!code) {
    return res.status(400).send("Authorization code is required");
  }

  try {
    // Get the Access Token from Webflow using the Authorization Code
    const publicUrl = await getNgrokUrl();
    const accessToken = await WebflowClient.getAccessToken({
      clientId: process.env.WEBFLOW_CLIENT_ID,
      clientSecret: process.env.WEBFLOW_CLIENT_SECRET,
      code: code,
      redirectUri: `${publicUrl}/auth/callback`,
    });

    // Store the Access Token in the DB
    await storeToken("user", accessToken); // Use access_token
    console.log("Access token obtained and stored. Redirecting to frontend...");
    return res.redirect("http://localhost:3000");
  } catch (error) {
    console.error("Error fetching access token:", error);
    return res.status(500).send("Failed to fetch access token");
  }
};
