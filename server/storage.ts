import { type User, type InsertUser, type Answer, type InsertAnswer } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Answer-related methods
  createAnswer(answer: InsertAnswer): Promise<Answer>;
  getAnswerById(id: string): Promise<Answer | undefined>;
  getAllAnswers(): Promise<Answer[]>;
  getAnswersByUserId(userId: string): Promise<Answer[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private answers: Map<string, Answer>;

  constructor() {
    this.users = new Map();
    this.answers = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createAnswer(insertAnswer: InsertAnswer): Promise<Answer> {
    const id = randomUUID();
    const answer: Answer = { 
      ...insertAnswer, 
      id,
      createdAt: new Date(),
      userId: insertAnswer.userId || null
    };
    this.answers.set(id, answer);
    return answer;
  }

  async getAnswerById(id: string): Promise<Answer | undefined> {
    return this.answers.get(id);
  }

  async getAllAnswers(): Promise<Answer[]> {
    return Array.from(this.answers.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getAnswersByUserId(userId: string): Promise<Answer[]> {
    return Array.from(this.answers.values())
      .filter(answer => answer.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const storage = new MemStorage();
