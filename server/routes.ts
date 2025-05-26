import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReportSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all establishments or filter by type
  app.get("/api/establishments", async (req, res) => {
    try {
      const type = req.query.type as string;
      const establishments = await storage.getEstablishments(type);
      res.json(establishments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch establishments" });
    }
  });

  // Get establishment by ID
  app.get("/api/establishments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const establishment = await storage.getEstablishment(id);
      
      if (!establishment) {
        return res.status(404).json({ message: "Establishment not found" });
      }
      
      res.json(establishment);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch establishment" });
    }
  });

  // Create a new report
  app.post("/api/reports", async (req, res) => {
    try {
      const reportData = insertReportSchema.parse(req.body);
      const report = await storage.createReport(reportData);
      
      // In a real app, you would send an email notification here
      console.log("New environmental report received:", report);
      
      res.status(201).json(report);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid report data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to create report" });
    }
  });

  // Get all reports (for admin purposes)
  app.get("/api/reports", async (req, res) => {
    try {
      const reports = await storage.getReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reports" });
    }
  });

  // Get all itineraries
  app.get("/api/itineraries", async (req, res) => {
    try {
      const itineraries = await storage.getItineraries();
      res.json(itineraries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch itineraries" });
    }
  });

  // Get itinerary by ID
  app.get("/api/itineraries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const itinerary = await storage.getItinerary(id);
      
      if (!itinerary) {
        return res.status(404).json({ message: "Itinerary not found" });
      }
      
      res.json(itinerary);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch itinerary" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
