const mongoose = require("mongoose");

const connection = async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/todo_db');
        console.log("Conectado a la BD !!!")
    } catch (error) {
        throw new Error ("No fue posible conectarse a la BD");
    }
}

module.exports = connection