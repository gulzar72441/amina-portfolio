
import { GoogleGenAI } from "@google/genai";
import { RESUME_DATA } from "../constants";

export class GeminiService {
  private ai: any;
  private context: string;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    this.context = `
      You are the AI personal assistant for Amina Gulzar, a professional Social Media Marketing Manager.
      Answer questions concisely and professionally based on her resume data:
      
      Summary: ${RESUME_DATA.summary}
      Experience: ${JSON.stringify(RESUME_DATA.experiences)}
      Education: ${JSON.stringify(RESUME_DATA.education)}
      Skills: ${JSON.stringify(RESUME_DATA.skills)}
      Contact: Phone ${RESUME_DATA.contact.phone}, Email ${RESUME_DATA.contact.email}, LinkedIn ${RESUME_DATA.contact.linkedin}
      Location: ${RESUME_DATA.contact.location}
      
      Be friendly, informative, and help potential employers or clients understand why Amina is a great fit.
    `;
  }

  async askQuestion(question: string) {
    if (!process.env.API_KEY) {
      return "I'm sorry, I'm currently in offline mode (API key not configured). Please check back later!";
    }

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: this.context + "\n\nUser Question: " + question }] }
        ],
        config: {
          temperature: 0.7,
          maxOutputTokens: 250,
        }
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "I encountered an error trying to process that. You can reach Amina directly at " + RESUME_DATA.contact.email;
    }
  }
}

export const geminiService = new GeminiService();
