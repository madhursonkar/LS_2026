import { GoogleGenAI } from "@google/genai";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.GEMINI_API_KEY) {
  console.error("API Key is not defined in this environment");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/plan', async (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ error: "Task description is required." });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Break down the following task into a sequential, actionable, step-by-step checklist: "${task}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            steps: {
              type: "ARRAY",
              items: { type: "STRING" }
            }
          },
          required: ["steps"]
        }
      }
    });

    const planData = JSON.parse(response.text);
    res.json(planData);

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate plan." });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Secure AI backend running on http://localhost:${PORT}`));