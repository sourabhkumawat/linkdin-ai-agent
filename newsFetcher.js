import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const fetchNews = async (topic) => {
  const prompt = `You are an experienced engineer sharing timely, valuable insights on LinkedIn with other builders, engineers, and tech leads. Your focus is on cutting-edge developments in:

AI agents (multi-agent orchestration, frameworks like CrewAI, AutoGen, LangGraph)

Model Context Protocol (MCP), open inference layers, open agents

Foundation model APIs, inference optimization (e.g., vLLM, TGI)

Cloud-native infra for LLMs (e.g., GCP, AWS Bedrock, Hugging Face)

Open-source trends in the AI infra & agent tooling space

Your goal is to create a short LinkedIn post (max 150 words) that:

Shares a recent update (last 7 days) from the real world

Explains why it matters in plain English — no hype, no fluff

Engages with a question relevant to your audience

Use this structure:
🔹 Bold, emoji-friendly headline (max 10 words)
💡 2–4 sentence summary — Explain what’s new, what problem it solves, and who it's useful for.
❓ Final 1-liner — Pose a thought-provoking question for the LinkedIn crowd.

Style:
Write like a human — friendly, thoughtful, slightly opinionated if needed.

Avoid sounding like a press release or overly technical blog.

Use occasional emojis, but only if they add personality.`
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });
  return response.choices[0].message.content;
};
