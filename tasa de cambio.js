const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { JSDOM } = require("jsdom");

const app = express();
app.use(cors());

app.get("/scrape", async (req, res) => {
    try {
        // 🔹 Reemplaza con la URL de la página de donde extraerás el dato
        const url = "https://www.google.com/finance/quote/USD-COP?sa=X&ved=2ahUKEwiziZPX15GMAxWwSjABHSMLF9MQmY0JegQIIBAu";

        // 1️⃣ Hacer la petición a la página
        const respuesta = await axios.get(url, {
            headers: { "User-Agent": "Mozilla/5.0" } // Evita bloqueos
        });

        // 2️⃣ Cargar la respuesta en JSDOM
        const dom = new JSDOM(respuesta.data);

        // 3️⃣ Buscar el elemento con la clase ".YMlKec.fxKbKc"
        const elemento = dom.window.document.querySelector(".YMlKec.fxKbKc");

        // 4️⃣ Extraer el texto del elemento
        const datoExtraido = elemento ? elemento.textContent : "No encontrado";

        // 5️⃣ Retornar el dato en JSON
        res.json({ dato: datoExtraido });

    } catch (error) {
        console.error("Error al obtener datos:", error);
        res.status(500).json({ error: "Error al obtener datos" });
    }
});

// 🔹 Puerto donde correrá el servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
