const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { ChatPromptTemplate } = require('@langchain/core/prompts');
require('dotenv').config();

const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.CODE_EDITOR_API_KEY,
    model: 'gemini-2.5-flash'
});

const codeAiResponse = async ({ query, code = {} }) => {
    const { html = "", css = "", js = "" } = code;
    try {
        const prompt = ChatPromptTemplate.fromTemplate(`
            You are a web development assistant.

You are a web development assistant.

Generate or modify code based on the user's request.

Rules:
- Return ONLY valid JSON.
- The first character of the response must be {{
- The last character of the response must be }}
- Do not include explanations.
- Do not include markdown.
- Do not include code blocks.
- Do not add any keys other than html, css, and js.
- Escape quotes and newlines properly.

Important:

When modifying an existing project:

- First determine whether the user's request affects HTML, CSS, JS, or a combination of them.
- Modify only the required file(s).
- For files that do not require changes, return them exactly as provided.

Examples:

If the request only affects CSS:
- Return the current HTML unchanged.
- Return the updated CSS.
- Return the current JS unchanged.

If the request only affects HTML:
- Return the updated HTML.
- Return the current CSS unchanged.
- Return the current JS unchanged.

If the request only affects JS:
- Return the current HTML unchanged.
- Return the current CSS unchanged.
- Return the updated JS.

Never regenerate or rewrite files that do not need modification.

Output Format:
{{
  "html": "<html code>",
  "css": "<css code>",
  "js": "<javascript code>"
}}

User Request:
{query}

Existing HTML:
{html}

Existing CSS:
{css}

Existing JS:
{js}

Instructions:

1. If HTML, CSS, and JS are empty:
   - Create a complete project from scratch.

2. If any existing code is provided:
   - Treat it as an existing project.
   - Modify the existing code according to the user's request.
   - Preserve all unrelated functionality.
   - Return the FULL updated html, css, and js files.
   - Never return partial code.
   - Never omit sections.

3. Ensure HTML, CSS, and JS work together correctly.
4. HTML must contain only body content.
5. CSS must contain only CSS.
6. JS must contain only JavaScript.
`);
        const chain = prompt.pipe(model);
        const response = await chain.invoke({ query, html, css, js });
        let text = Array.isArray(response.content) ? response.content.map((item) => item.text).join("") : response.text;
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();
        console.log(text)


        const parsed = JSON.parse(text);
        return { html: parsed.html, css: parsed.css, js: parsed.js };
    } catch (e) {
        console.log(e.message);
        return null
    }
}

module.exports = codeAiResponse;