
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateTournamentHype = async (game: string, title: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a short, exciting 2-sentence marketing description for a ${game} tournament titled "${title}". Focus on competitive energy and glory.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The ultimate battle for glory awaits. Are you ready to dominate?";
  }
};
