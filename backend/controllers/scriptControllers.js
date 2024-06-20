import { WebflowClient } from "webflow-api";
import fetch from "node-fetch";
import Sri from "subresource-integrity";

const accessToken = "";
const webflow = new WebflowClient({ accessToken });

/*
  Get Registered Scripts
  Path Params: siteId
*/
export const getRegisteredScripts = async (req, res) => {
  try {
    const siteId = req.params.siteId;
    const data = await req.webflow.scripts.list(siteId);
    res.json(data.registeredScripts); // Respond with list of scripts
  } catch (error) {
    console.error("Error fetching scripts:", error);
    res.status(500).send("Failed to fetch scripts");
  }
};

/*
  Register Script - Inline
  Path Params: siteId
  Query Params: sourceCode, canCopy, version, displayName
*/
export const registerInlineScript = async (req, res) => {
  try {
    const siteId = req.params.siteId;

    // Create Inline Request from the body
    const request = {
      sourceCode: req.body.sourceCode,
      canCopy: req.body.canCopy !== undefined ? req.body.canCopy : true, // Default to true if not provided
      version: req.body.version,
      displayName: req.body.displayName,
    };

    // Register Script
    const data = await req.webflow.scripts.registerInline(siteId, request);
    res.json(data);
  } catch (error) {
    console.error("Error registering inline script:", error);
    res.status(500).send("Failed to register inline script");
  }
};

/*
  Register Script - Hosted
  Path Params: siteId
  Query Params: hostedLocation, canCopy, version, displayName
*/
export const registerHostedScript = async (req, res) => {
  try {
    const siteId = req.params.siteId;

    // Function to get integrity hash of hosted script
    async function generateSRI(url) {
      const response = await fetch(url);
      const data = await response.text();
      const integrity = Sri(data, ["sha256"]);
      return integrity;
    }

    // Generate the Integrity Hash from the hostedLocation
    const hostedLocation = req.body.hostedLocation; // Change from req.query to req.body
    const integrityHash = await generateSRI(hostedLocation);

    // Body of Hosted Script Request
    const script = {
      hostedLocation: hostedLocation,
      integrityHash: integrityHash,
      canCopy: true,
      version: req.body.version, // Change from req.query to req.body
      displayName: req.body.displayName, // Change from req.query to req.body
    };

    // Register Script
    const data = await req.webflow.scripts.registerHosted(siteId, script);
    res.json(data);
  } catch (error) {
    console.error("Error registering hosted script:", error);
    res.status(500).send("Failed to register hosted script");
  }
};

/*
  List Custom Code Blocks (aka scripts applied to a site)
  Path Params: siteId
*/
export const listCustomCodeBlocks = async (req, res) => {
  try {
    const siteId = req.params.siteId;
    const data = await req.webflow.sites.scripts.listCustomCodeBlocks(siteId);
    res.json(data);
  } catch (error) {
    console.error("Error fetching custom code blocks:", error);
    res.status(500).send("Failed to fetch custom code blocks");
  }
};

// ⭐️ SITES ⭐️ //

/*
  Get Custom Code - Sites
  Path Params: siteId
*/
export const getSiteCustomCode = async (req, res) => {
  try {
    const siteId = req.params.siteId;
    const data = await req.webflow.sites.scripts.getCustomCode(siteId);
    res.json(data);
  } catch (error) {
    console.error("Error fetching site-level custom code:", error);
    res.status(500).send("Failed to fetch site-level custom code");
  }
};

/*
  Delete Custom Code - Sites
  Path Params: siteId
*/
export const deleteSiteCustomCode = async (req, res) => {
  try {
    const siteId = req.params.siteId;
    const data = await req.webflow.sites.scripts.deleteCustomCode(siteId);
    res.json(data);
  } catch (error) {
    console.error("Error deleting site-level custom code:", error);
    res.status(500).send("Failed to delete site-level custom code");
  }
};

/*
  Add/Update Custom Code - Sites
  Path Params: siteId
  Query Params: selectedScript, location, version
*/
export const upsertSiteCustomCode = async (req, res) => {
  try {
    const siteId = req.params.siteId;
    const scriptApplyList = {
      scripts: [
        {
          id: req.query.selectedScript,
          location: req.query.location,
          version: req.query.version,
        },
      ],
    };

    // Apply scripts to site
    const data = await req.webflow.sites.scripts.upsertCustomCode(
      siteId,
      scriptApplyList
    );
    res.json(data);
  } catch (error) {
    console.error("Error adding/updating site-level custom code:", error);
    res.status(500).send("Failed to add/update site-level custom code");
  }
};

// ⭐️ Pages ⭐️ //

/*
  Get Custom Code - Pages
  Path Params: pageId
*/
export const getPageCustomCode = async (req, res) => {
  try {
    const pageId = req.params.pageId;
    const data = await req.webflow.pages.scripts.getCustomCode(pageId);
    res.json(data);
  } catch (error) {
    console.error("Error fetching page-level custom code:", error);
    res.status(500).send("Failed to fetch page]-level custom code");
  }
};

/*
  Delete Custom Code - Pages
  Path Params: pageId
*/
export const deletePageCustomCode = async (req, res) => {
  try {
    const pageId = req.params.pageId;
    const data = await req.webflow.pages.scripts.deleteCustomCode(pageId);
    res.json(data);
  } catch (error) {
    console.error("Error deleting page-level custom code:", error);
    res.status(500).send("Failed to delete page-level custom code");
  }
};

/*
  Add/Update Custom Code - Pages
  Path Params: pageId
  Query Params: selectedScript, location, version
*/
export const upsertPageCustomCode = async (req, res) => {
  const pageId = req.params.pageId;
  const { selectedScript, version } = req.body;

  // Define the function to apply scripts to the page
  const applyScripts = async (scriptApplyList) => {
    try {
      const data = await req.webflow.pages.scripts.upsertCustomCode(
        pageId,
        scriptApplyList
      );
      res.json(data);
    } catch (error) {
      console.error("Error adding/updating page-level custom code:", error);
      res.status(500).send("Failed to add/update page-level custom code");
    }
  };

  try {
    // Get Existing Scripts
    const response = await req.webflow.pages.scripts.getCustomCode(pageId);
    const existingScripts = response.scripts || [];
    const newScript = {
      id: selectedScript,
      location: req.query.location,
      version: version,
    };

    existingScripts.push(newScript);
    const scriptApplyList = {
      scripts: existingScripts,
    };
    console.log(scriptApplyList);

    // Apply the scripts
    await applyScripts(scriptApplyList);
  } catch (error) {
    console.error("Failed to fetch scripts", error);

    const scriptApplyList = {
      scripts: [
        {
          id: selectedScript,
          location: req.query.location,
          version: version,
        },
      ],
    };

    // Apply the scripts in case of error fetching existing scripts
    await applyScripts(scriptApplyList);
  }
};
