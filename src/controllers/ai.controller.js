import {AiService} from "../service/ai.service"

const getReview = async(code,language)=>{
    const prompt = `
    You are reviewing a ${language} code snippet.     
    \`\`\`${language}
    ${code}
    \`\`\`
    `;
console.log("function", prompt)
    if (!prompt) {
        return alert("Prompt is required")
    }

    const response = await AiService(prompt,language);

    return(response);
}

export default getReview;

