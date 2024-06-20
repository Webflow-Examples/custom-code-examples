// List Sites
export const listSites = async (req, res) => {
  try {
    const data = await req.webflow.sites.list();
    res.json(data.sites); // Respond with Site Data
  } catch (error) {
    console.error("Error fetching sites:", error);
    res.status(500).send("Failed to fetch sites");
  }
};

// List Pages
export const listPages = async (req, res) => {
  try {
    const data = await req.webflow.pages.list(req.params.siteId);
    res.json(data.pages); // Respond with Page Data
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).send("Failed to fetch pages");
  }
};

// Get Page
export const getPage = async (req, res) => {
  try {
    const data = await req.webflow.pages.getMetadata(req.params.pageId);
    res.json(data);
  } catch (error) {
    console.error("Error fetching page", error);
    res.status(500).send("Failed to fetch page");
  }
};

// Publish Site
export const publishSite = async (req, res) => {
  try {
    const data = await req.webflow.sites.publish(req.params.siteId, {
      publishToWebflowSubdomain: true,
    });
    res.json(data);
  } catch (error) {
    console.error("Error Publishing Site", error);
    res.status(500).send("Failed to publish site");
  }
};
