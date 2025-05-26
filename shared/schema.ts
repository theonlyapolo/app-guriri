import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const establishments = pgTable("establishments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // "hotel", "restaurant"
  address: text("address").notNull(),
  phone: text("phone"),
  rating: integer("rating").default(0), // 1-5 stars
  reviewCount: integer("review_count").default(0),
  priceRange: text("price_range"), // "$", "$$", "$$$"
  description: text("description"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  imageUrl: text("image_url"),
  website: text("website"),
  isActive: boolean("is_active").default(true),
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  contact: text("contact"),
  status: text("status").default("pending"), // "pending", "reviewed", "resolved"
  createdAt: timestamp("created_at").defaultNow(),
});

export const itineraries = pgTable("itineraries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  duration: integer("duration").notNull(), // days
  difficulty: text("difficulty").notNull(), // "basic", "intermediate", "advanced"
  description: text("description").notNull(),
  activities: text("activities").array(),
  price: text("price"),
  isPopular: boolean("is_popular").default(false),
});

export const insertEstablishmentSchema = createInsertSchema(establishments).omit({
  id: true,
  isActive: true,
});

export const insertReportSchema = createInsertSchema(reports).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertItinerarySchema = createInsertSchema(itineraries).omit({
  id: true,
});

export type Establishment = typeof establishments.$inferSelect;
export type InsertEstablishment = z.infer<typeof insertEstablishmentSchema>;
export type Report = typeof reports.$inferSelect;
export type InsertReport = z.infer<typeof insertReportSchema>;
export type Itinerary = typeof itineraries.$inferSelect;
export type InsertItinerary = z.infer<typeof insertItinerarySchema>;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
