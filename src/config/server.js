import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

// Callback que recibe el "code" de Llave CDMX
app.get("/auth/callback", async (req, res) => {
  const code = req.query.code;

  try {
    // 1. Intercambiar el code por access_token
    const tokenRes = await fetch("https://llave.cdmx.gob.mx/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: "http://localhost:4000/auth/callback",
        grant_type: "authorization_code",
        code
      })
    });

    const tokenData = await tokenRes.json();

    // 2. Con el token pedir datos del usuario
    const userRes = await fetch("https://llave.cdmx.gob.mx/oauth2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });

    const userData = await userRes.json();

    // 3. Redirigir a tu frontend con los datos del usuario
    res.redirect(`http://localhost:3000/menu-principal?user=${encodeURIComponent(userData.name)}`);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en autenticación" });
  }
});

app.listen(4000, () => console.log("Servidor corriendo en http://localhost:4000"));
