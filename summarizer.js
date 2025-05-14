import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const summarizeNews = async (title, link) => {
  const prompt = `Summarize this article for LinkedIn:\n\nTitle: ${title}\nLink: ${link}`;
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content;
};
