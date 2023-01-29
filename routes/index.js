import express, { Router } from "express";

const router = Router();
import balance from "./balance.js";
import entry from "./entry.js";

router.use("/balance", balance);
router.use("/entry", entry);

export default router;
