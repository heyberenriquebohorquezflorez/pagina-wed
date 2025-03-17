const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { JSDOM } = require("jsdom");

const app = express();
app.use(cors());

app.get("/scrape", async (req, res) => {
    try {
        const respuesta = await axios.get("https://federaciondecafeteros.org/wp/"); // Ajusta la URL real
        const dom = new JSDOM(respuesta.data);
        const elementos = dom.window.document.querySelector("tasa-de-cambio:"); // Ajusta el selector

        res.json({ texto: elementos ? elementos.textContent : "No se encontró la información" });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos" });
    }
});

// Configurar puerto dinámico para Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
