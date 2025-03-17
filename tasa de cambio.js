const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { JSDOM } = require("jsdom");

const app = express();
app.use(cors());

app.get("/scrape", async (req, res) => {
    try {
        const response = await axios.get("https://federaciondecafeteros.org/wp/"); // Reemplaza con la URL real
        const dom = new JSDOM(response.data);
        const elemento = dom.window.document.querySelector("tasa de cambio:"); // Cambia "tasa de cambio"
        res.json({ text: elemento ? elemento.textContent : "No encontrado" });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener datos" });
    }
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
