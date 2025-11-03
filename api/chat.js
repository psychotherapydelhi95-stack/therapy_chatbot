chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  const { message } = req.body || {};

  // Crisis detection
  if (/suicide|kill myself|end my life|want to die/i.test(message || '')) {
    return res.json({
      isCrisis: true,
      reply: "I'm really concerned for your safety. If you're in immediate danger, please call your local emergency services or, in the U.S., dial 988 (Suicide and Crisis Lifeline).",
      resources: "https://findahelpline.com"
    });
  }

  try {
    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are Miri, a supportive assistant for a psychotherapy website. You are not a therapist, but you provide gentle, empathetic responses, self-care ideas, and referrals to professional help when appropriate.' },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || 'I’m here to listen.';
    res.json({ isCrisis: false, reply });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
