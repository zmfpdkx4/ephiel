
import { GoogleGenAI } from "@google/genai";
import { Character, ChatMessage } from "./types.ts";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // process 객체가 정의되어 있는지 안전하게 확인
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
    this.ai = new GoogleGenAI({ apiKey: apiKey || "" });
  }

  async chatWithCharacter(character: Character, history: ChatMessage[], userMessage: string) {
    const systemInstruction = `
      You are playing the role of ${character.name} from a visual novel set in Ephiel Academy (에피엘 아카데미).
      Character Details:
      - Title: ${character.title}
      - Personality: ${character.personality}
      - Background: ${character.description}
      - Quotes for tone reference: ${character.quotes.join(' ')}

      Rules:
      1. Stay in character at all times.
      2. Respond ONLY in Korean.
      3. Keep responses concise (under 3 sentences).
      4. Use a tone that reflects your personality (e.g., stoic, playful, or mysterious).
      5. Treat the user as a fellow student at the academy.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(msg => ({
             role: msg.role === 'user' ? 'user' : 'model',
             parts: [{ text: msg.text }]
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.8,
          topP: 0.95,
        },
      });

      return response.text || "응답을 생성할 수 없어.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "아카데미 통신망에 장애가 발생했습니다. (연결 실패)";
    }
  }
}

export const geminiService = new GeminiService();
