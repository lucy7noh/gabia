import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { askQuestionSchema, insertAnswerSchema } from "@shared/schema";
import { generateMysticalAnswer, generateDailyFortune } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Ask a question and get mystical answer
  app.post("/api/ask", async (req, res) => {
    try {
      const { question } = askQuestionSchema.parse(req.body);
      
      // Generate mystical answer using OpenAI
      const answer = await generateMysticalAnswer(question);
      
      // Save the Q&A to storage
      const savedAnswer = await storage.createAnswer({
        question,
        answer,
        userId: undefined // For now, no user association
      });
      
      res.json({ 
        id: savedAnswer.id,
        question: savedAnswer.question,
        answer: savedAnswer.answer,
        createdAt: savedAnswer.createdAt
      });
    } catch (error) {
      console.error("Error in /api/ask:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "질문 처리 중 오류가 발생했습니다" 
      });
    }
  });

  // Get daily fortune
  app.get("/api/daily-fortune", async (req, res) => {
    try {
      const fortune = await generateDailyFortune();
      res.json({ fortune });
    } catch (error) {
      console.error("Error in /api/daily-fortune:", error);
      res.status(500).json({ 
        message: "오늘의 운세를 가져오는 중 오류가 발생했습니다" 
      });
    }
  });

  // Get all saved answers
  app.get("/api/answers", async (req, res) => {
    try {
      const answers = await storage.getAllAnswers();
      res.json(answers);
    } catch (error) {
      console.error("Error in /api/answers:", error);
      res.status(500).json({ 
        message: "저장된 답변을 가져오는 중 오류가 발생했습니다" 
      });
    }
  });

  // Get specific answer by ID
  app.get("/api/answers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const answer = await storage.getAnswerById(id);
      
      if (!answer) {
        return res.status(404).json({ message: "답변을 찾을 수 없습니다" });
      }
      
      res.json(answer);
    } catch (error) {
      console.error("Error in /api/answers/:id:", error);
      res.status(500).json({ 
        message: "답변을 가져오는 중 오류가 발생했습니다" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
