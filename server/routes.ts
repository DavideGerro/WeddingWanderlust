import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContributionSchema } from "@shared/schema";
import { z } from "zod";
import sgMail from "@sendgrid/mail";

const rsvpSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  attending: z.boolean()
});

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

  // RSVP endpoint - sends email notification
  app.post("/api/rsvp", async (req, res) => {
    try {
      const { name, email, attending } = rsvpSchema.parse(req.body);
      
      const sendGridKey = process.env.SENDGRID_API_KEY;
      if (!sendGridKey) {
        console.log("SendGrid not configured, logging RSVP:", { name, email, attending });
        return res.status(200).json({ 
          success: true, 
          message: "RSVP recorded (email not sent - SendGrid not configured)" 
        });
      }

      sgMail.setApiKey(sendGridKey);
      
      const attendingStatus = attending ? "WILL ATTEND" : "CANNOT ATTEND";
      const msg = {
        to: "dgeris@icloud.com",
        from: "noreply@wedding.com",
        subject: `Wedding Brunch RSVP: ${name} - ${attendingStatus}`,
        html: `
          <h2>New RSVP for Sunset Boat Tour</h2>
          <p><strong>Guest Name:</strong> ${name}</p>
          <p><strong>Guest Email:</strong> ${email}</p>
          <p><strong>Attending:</strong> ${attending ? "Yes, I'll be there!" : "Unfortunately cannot make it"}</p>
          <hr>
          <p><em>This RSVP was submitted from the Sara & Devid Wedding website.</em></p>
        `
      };

      await sgMail.send(msg);
      res.status(200).json({ success: true, message: "RSVP sent successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid RSVP data", errors: error.errors });
      } else {
        console.error("RSVP email error:", error);
        res.status(500).json({ message: "Failed to send RSVP" });
      }
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
