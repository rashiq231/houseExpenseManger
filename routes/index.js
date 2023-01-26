import express, { Router } from "express";

const router = Router();
import balance from "./balance.js";

router.use("/balance", balance);

export default router;
