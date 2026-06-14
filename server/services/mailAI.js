const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { ChatPromptTemplate } = require('@langchain/core/prompts');
require('dotenv').config();

const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.WEATHER_API_KEY,
    model: 'gemini-2.5-flash'
});

const mailAiResponse = async (query) => {
    try {
        const prompt = ChatPromptTemplate.fromTemplate(`
            You are an email writing assistant.

Generate an email from the user's request.

Rules:
- Return ONLY valid JSON.
- Do not include explanations.
- Do not include introductions like "How can I help you?".
- Do not include notes, tips, suggestions, or extra text.
- Do not include markdown or code blocks.
- Generate a concise and relevant subject.
- Generate a complete professional email message.
- The message should be ready to send.

Output format:

{{
  "subject": "email subject",
  "message": "email body"
        }}

User Request:
{query}
`);
        const chain = prompt.pipe(model);
        const response = await chain.invoke({ query });
        let text = Array.isArray(response.content) ? response.content.map((item) => item.text).join("") : response.text;
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();


        const { subject, message } = JSON.parse(text);
        return { subject, message };
    } catch (e) {
        console.log(e.message);
        return null
    }
}

module.exports = mailAiResponse;