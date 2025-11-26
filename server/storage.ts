import { users, type User, type InsertUser, contributions, type Contribution, type InsertContribution } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContribution(contribution: InsertContribution): Promise<Contribution>;
  getContributions(): Promise<Contribution[]>;
  getTotalContributions(): Promise<number>;
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
}

export const storage = new DatabaseStorage();
