import cors from 'cors';
import 'dotenv/config';
import express from "express";
import routes from "./src/routes.js";

console.log("Starting server...");

const app = express();
app.use(express.json());

// Enable CORS for all routes from localhost:3000
app.use(cors({
  origin: ["https://tasks-ipxl.vercel.app"],
  methods: ["GET","POST","OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));


console.log("Mounting /api routes");
app.use("/api", routes);

app.get("/", (req, res) => {
  console.log("GET / hit");
  res.send('Email Extractor API is running. Use POST /api/extract-email-details');
});

export default app;
