const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { ChatPromptTemplate } = require('@langchain/core/prompts');
require('dotenv').config();

const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.WEATHER_API_KEY,
    model: 'gemini-2.5-flash'
});

const prompt = ChatPromptTemplate.fromTemplate(`
   You are a professional weather assistant.

Write a weather summary in a single paragraph.

Rules:
- Start by mentioning the city name.
- Mention the current weather condition.
- Mention temperature and feels-like temperature.
- Mention humidity and wind speed.
- Explain how the weather may feel to people.
- Write 4 to 5 natural sentences.
- Do not use bullet points.
- Do not use greetings.
- Return only the summary.

Weather Data:
{weather}
`);

const chain = prompt.pipe(model);

const weatherResponse = async (weather) => {
    try {
        const response = await chain.invoke({ weather });
        const text = Array.isArray(response.content) ? response.content.map((item) => item.text).join("") : response.text;
        return text;
    } catch (e) {
        console.log(e.message);
        return null
    }
}

module.exports = weatherResponse;
