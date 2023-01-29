import { json, Router } from "express";
import { fstat } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";

import { __homeDirectory } from "../index.js";
import path from "node:path";

// const __dirname = dirnameFunction(import.meta.url);

const router = Router();
router.use((req, res, next) => {
  next();
});

router.get("/", async (req, res) => {
  let data = await readFile(path.join(__homeDirectory + "/data/balance.json"));
  res.send(JSON.parse(data));
});

router.post("/", async (req, res) => {
  await writeFile(
    path.join(__homeDirectory + "/data/balance.json"),
    JSON.stringify(req.body)
  );
  res.status(200).send(req.body);
});

export default router;
