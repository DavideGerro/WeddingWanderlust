import { users, type User, type InsertUser, contributions, type Contribution, type InsertContribution } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contribution methods
  createContribution(contribution: InsertContribution): Promise<Contribution>;
  getContributions(): Promise<Contribution[]>;
  getTotalContributions(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contributions: Map<number, Contribution>;
  userCurrentId: number;
  contributionCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contributions = new Map();
    this.userCurrentId = 1;
    this.contributionCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContribution(insertContribution: InsertContribution): Promise<Contribution> {
    const id = this.contributionCurrentId++;
    const contribution: Contribution = { 
      ...insertContribution, 
      id, 
      createdAt: new Date() 
    };
    this.contributions.set(id, contribution);
    return contribution;
  }

  async getContributions(): Promise<Contribution[]> {
    return Array.from(this.contributions.values());
  }

  async getTotalContributions(): Promise<number> {
    const contributions = Array.from(this.contributions.values());
    return contributions.reduce((sum, contribution) => sum + contribution.amount, 0);
  }
}

export const storage = new MemStorage();
