import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const isFoodRelated = (text: string) => {
      const keywords = ["recipe", "cook", "food", "dish", "ingredient", "meal"];
      return keywords.some((word) =>
        text.toLowerCase().includes(word)
      );
    };

    if (!isFoodRelated(message)) {
      return Response.json({
        reply: "❌ I can only help with cooking and food-related questions.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a professional cooking assistant.

Return ONLY valid JSON. No markdown, no explanation.

User input: ${message}

Format:
{
  "type": "recipe or location",
  "recipe_name": "",
  "ingredients": [],
  "steps": [],
  "cooking_time": "",
  "difficulty": "",
  "famous_foods": []
}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (e) {
      console.error("JSON Parse Error:", e);
      parsed = {
        error: "Invalid AI response",
        raw: text, 
      };
    }

    return Response.json({ reply: parsed });

  } catch (error: any) {
    console.error("🔥 API ERROR:", error);

    return Response.json(
      {
        reply: { error: error.message || "Something went wrong" },
      },
      { status: 500 }
    );
  }
}