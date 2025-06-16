import { GoogleGenerativeAI } from"@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",
    systemInstruction: `

    `
 });   

async function AiService(prompt) {
    const result = await model.generateContent(prompt);
    return result.response.text();
}

export {AiService};