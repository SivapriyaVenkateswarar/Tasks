import express from "express";
import { handleEmailExtraction } from "./controller.js";

console.log("Routes.js loaded");

const router = express.Router();

router.post("/extract-email-details", (req, res) => {
  console.log("POST /extract-email-details hit", req.body);
  handleEmailExtraction(req, res);
});

export default router;
