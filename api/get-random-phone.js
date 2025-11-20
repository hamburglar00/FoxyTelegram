// /api/get-random-phone.js
export default async function handler(req, res) {
  try {
    const AGENCY_ID = ;
    const API_URL = `https://api.asesadmin.com/api/v1/agency/${AGENCY_ID}/random-phone`;

    const response = await fetch(API_URL, {
      headers: { "Cache-Control": "no-store" },
    });

    if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
    const data = await response.json();

    // 🧠 Normalizamos el valor del teléfono
    let phone = null;
    if (typeof data === "string") {
      phone = data;
    } else if (data?.phone_number) {
      phone = String(data.phone_number); // ✅ convierte a string aunque sea numérico
    } else if (data?.number) {
      phone = String(data.number);
    } else if (data?.data?.number) {
      phone = String(data.data.number);
    }

    if (!phone || phone.length < 8) throw new Error("No se encontró número válido");

    // ✅ Enviamos el número activo con el nombre "DIANA"
    return res.status(200).json({
      number: phone,
      name: "DIANA",
      weight: 1,
    });
  } catch (err) {
    console.error("❌ Error al obtener número:", err.message);
    // Fallback automático (Soporte Diana)
    return res.status(200).json({
      number: "5493517699950",
      name: "Diana",
      weight: 1,
    });
  }
}
