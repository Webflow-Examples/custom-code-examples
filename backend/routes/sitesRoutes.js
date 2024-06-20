import express from "express";
import {
  listSites,
  listPages,
  getPage,
  publishSite,
} from "../controllers/sitesController.js";

const router = express.Router();

// List all sites for a given access token. See listSites controller for logic.
router.get("/", listSites);
router.get("/:siteId/pages", listPages);
router.get("/:pageId/page", getPage);
router.post("/:siteId/publish", publishSite);

export default router;
