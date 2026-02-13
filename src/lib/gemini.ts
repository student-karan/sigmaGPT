import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

async function fetchGeminiResponse(message: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
        const result = await model.generateContent(message);
        return result.response.text();
    } catch(err){
        if(err instanceof Error){
            throw new Error(err.message);
        } else {
            throw new Error("An error occured while fetching the response from Gemini.");
        }
    }
}

export default fetchGeminiResponse;