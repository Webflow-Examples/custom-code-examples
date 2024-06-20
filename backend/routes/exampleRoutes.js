import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/scripts", (req, res) => {
  const scriptsDir = path.join(__dirname, "../public/example-scripts");
  fs.readdir(scriptsDir, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to scan directory");
    }
    // Filter only .js files
    const scripts = files.filter((file) => path.extname(file) === ".js");
    res.json(scripts);
  });
});

export default router;
