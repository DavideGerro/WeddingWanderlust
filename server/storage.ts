import { users, type User, type InsertUser, contributions, type Contribution, type InsertContribution, rsvps, type Rsvp, type InsertRsvp } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContribution(contribution: InsertContribution): Promise<Contribution>;
  getContributions(): Promise<Contribution[]>;
  getTotalContributions(): Promise<number>;
  
  createOrUpdateRsvp(rsvp: InsertRsvp): Promise<Rsvp>;
  getRsvpByEmail(email: string): Promise<Rsvp | undefined>;
  getAllRsvps(): Promise<Rsvp[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createContribution(insertContribution: InsertContribution): Promise<Contribution> {
    const [contribution] = await db.insert(contributions).values(insertContribution).returning();
    return contribution;
  }

  async getContributions(): Promise<Contribution[]> {
    return await db.select().from(contributions).orderBy(contributions.createdAt);
  }

  async getTotalContributions(): Promise<number> {
    const result = await db.select({ total: sql<number>`COALESCE(SUM(${contributions.amount}), 0)` }).from(contributions);
    return result[0]?.total || 0;
  }

  async createOrUpdateRsvp(insertRsvp: InsertRsvp): Promise<Rsvp> {
    const existing = await this.getRsvpByEmail(insertRsvp.email);
    if (existing) {
      const [updated] = await db
        .update(rsvps)
        .set({
          ...insertRsvp,
          updatedAt: new Date()
        })
        .where(eq(rsvps.email, insertRsvp.email))
        .returning();
      return updated;
    }
    const [rsvp] = await db.insert(rsvps).values(insertRsvp).returning();
    return rsvp;
  }

  async getRsvpByEmail(email: string): Promise<Rsvp | undefined> {
    const [rsvp] = await db.select().from(rsvps).where(eq(rsvps.email, email));
    return rsvp;
  }

  async getAllRsvps(): Promise<Rsvp[]> {
    return await db.select().from(rsvps).orderBy(rsvps.createdAt);
  }
}

export const storage = new DatabaseStorage();
