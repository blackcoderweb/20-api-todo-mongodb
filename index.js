const express = require("express");
const cors = require("cors");
const connection = require("./database/connection");

console.log("API-TODO iniciada !!!");

connection();

const app = express();
const port = 3900;

app.use(cors());

// Convertir body a objeto js
app.use(express.json()); // Recibir datos con content-type app/json
app.use(express.urlencoded({extended:true})) // Recibir datos form-urlencoded

// Importando las rutas desde mi archivo de rutas
const test = require ("./routes/todoRoutes");
const create = require ("./routes/todoRoutes");
const list = require ("./routes/todoRoutes");
const deleteTodo = require ("./routes/todoRoutes");
const update = require ("./routes/todoRoutes");
const todoCount = require ("./routes/todoRoutes");

// Ruta de prueba
app.use("/api", test);

// Usar las rutas importadas desde mi archivo de rutas incluyendo "/api"
app.use("/api", create);
app.use("/api", list);
app.use("/api", deleteTodo);
app.use("/api", update);
app.use("/api", todoCount);



app.listen(port, () => {
    console.log("Server escuchando en el puerto " + port);
})