import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContributionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints for honeymoon contributions
  app.get("/api/contributions", async (req, res) => {
    try {
      const contributions = await storage.getContributions();
      res.json(contributions);
    } catch (error) {
      res.status(500).json({ message: "Failed to get contributions" });
    }
  });

  app.get("/api/contributions/total", async (req, res) => {
    try {
      const total = await storage.getTotalContributions();
      res.json({ total });
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate total contributions" });
    }
  });

  app.post("/api/contributions", async (req, res) => {
    try {
      const validatedData = insertContributionSchema.parse(req.body);
      const contribution = await storage.createContribution(validatedData);
      res.status(201).json(contribution);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid contribution data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create contribution" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
