import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContributionSchema, insertRsvpSchema } from "@shared/schema";
import { z } from "zod";
import sgMail from "@sendgrid/mail";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

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

  // RSVP endpoints
  app.post("/api/rsvp", async (req, res) => {
    try {
      const validatedData = insertRsvpSchema.parse(req.body);
      const rsvp = await storage.createOrUpdateRsvp(validatedData);
      res.status(201).json({ success: true, rsvp, isUpdate: !!req.body.existingEmail });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid RSVP data", errors: error.errors });
      } else {
        console.error("RSVP error:", error);
        res.status(500).json({ message: "Failed to save RSVP" });
      }
    }
  });

  app.get("/api/rsvp/:email", async (req, res) => {
    try {
      const rsvp = await storage.getRsvpByEmail(req.params.email);
      if (!rsvp) {
        return res.status(404).json({ message: "RSVP not found" });
      }
      res.json({
        name: rsvp.name,
        email: rsvp.email,
        attendingWedding: rsvp.attendingWedding,
        attendingBoatTour: rsvp.attendingBoatTour,
        numberOfGuests: rsvp.numberOfGuests,
        dietaryRestrictions: rsvp.dietaryRestrictions
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get RSVP" });
    }
  });

  app.get("/api/admin/rsvps", async (req, res) => {
    const adminKey = req.headers["x-admin-key"];
    const validAdminKey = process.env.ADMIN_SECRET_KEY;
    
    if (!validAdminKey || adminKey !== validAdminKey) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const rsvps = await storage.getAllRsvps();
      const stats = {
        total: rsvps.length,
        attendingWedding: rsvps.filter(r => r.attendingWedding).length,
        attendingBoatTour: rsvps.filter(r => r.attendingBoatTour).length,
        totalGuests: rsvps.reduce((sum, r) => sum + (r.numberOfGuests || 1), 0)
      };
      res.json({ rsvps, stats });
    } catch (error) {
      res.status(500).json({ message: "Failed to get RSVPs" });
    }
  });

  app.delete("/api/admin/rsvps", async (req, res) => {
    const adminKey = req.headers["x-admin-key"];
    const validAdminKey = process.env.ADMIN_SECRET_KEY;

    if (!validAdminKey || adminKey !== validAdminKey) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const { ids } = z.object({ ids: z.array(z.number()) }).parse(req.body);
      await storage.deleteRsvps(ids);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete RSVPs" });
    }
  });

  // Geo-detection endpoint for automatic language selection
  app.get("/api/geo", async (req, res) => {
    try {
      const clientIp = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || '';
      const ip = clientIp.split(',')[0].trim();
      
      const apiUrl = ip && ip !== '::1' && !ip.startsWith('127.') 
        ? `https://ipapi.co/${ip}/json/` 
        : 'https://ipapi.co/json/';
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Geo API failed");
      }
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.reason || "Geo API error");
      }
      
      const countryCode = data.country_code?.toUpperCase() || "";
      
      let language = "en";
      if (countryCode === "IT") {
        language = "it";
      } else if (countryCode === "ES" || countryCode === "MA") {
        language = "es";
      }
      
      res.json({ country: countryCode, language });
    } catch (error) {
      console.error("Geo detection error:", error);
      res.json({ country: null, language: "en" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
