import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "",
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    const { cards, intent = 'General', language = 'EN' } = await req.json();

    if (!cards || !Array.isArray(cards) || cards.length !== 5) {
      return new Response(JSON.stringify({ error: 'Please provide 5 cards.' }), { status: 400 });
    }

    const langString = language === 'ES' ? 'SPANISH' : 'ENGLISH';
    const systemPrompt = `Act as a cryptic, direct tarot reader. The seeker's focus is: ${intent}. YOU MUST WRITE THE ENTIRE READING IN ${langString}. Tone: gothic, mysterious, concise. Avoid fluff.`;
    const userPrompt = `The seeker has drawn 5 Major Arcana cards:
1. ${cards[0]} (Past)
2. ${cards[1]} (Present)
3. ${cards[2]} (Hidden Influence)
4. ${cards[3]} (Advice)
5. ${cards[4]} (Outcome)
`;

    const response = await openai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      stream: true,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) controller.enqueue(encoder.encode(content));
          }
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: any) {
    console.error("Tarot reading error:", error);
    return new Response(JSON.stringify({ error: error.message || 'Error' }), { status: 500 });
  }
}
