import express from "express";
import {
  getRegisteredScripts,
  registerInlineScript,
  registerHostedScript,
  listCustomCodeBlocks,
  getSiteCustomCode,
  deleteSiteCustomCode,
  upsertSiteCustomCode,
  getPageCustomCode,
  deletePageCustomCode,
  upsertPageCustomCode,
} from "../controllers/scriptControllers.js";

const router = express.Router();

// Define routes
router.get("/scripts/:siteId", getRegisteredScripts);
router.post("/scripts/:siteId/inline", registerInlineScript);
router.post("/scripts/:siteId/hosted", registerHostedScript);
router.get("/:siteId/listBlocks", listCustomCodeBlocks);
router.get("/sites/:siteId/getCustomCode", getSiteCustomCode);
router.delete("/sites/:siteId/deleteCustomCode", deleteSiteCustomCode);
router.put("/sites/:siteId/upsertCustomCode", upsertSiteCustomCode);
router.get("/pages/:pageId/getCustomCode", getPageCustomCode);
router.delete("/pages/:pageId/deleteCustomCode", deletePageCustomCode);
router.put("/pages/:pageId/upsertCustomCode", upsertPageCustomCode);

export default router;
