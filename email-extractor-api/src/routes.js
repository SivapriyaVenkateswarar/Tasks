import express from "express";
import { handleEmailExtraction } from "./controller.js";

const router = express.Router();

router.post("/extract-email-details", handleEmailExtraction);

export default router;
