const mongoose = require ("mongoose");
const {Schema, model} = mongoose;

const todoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default:"pendiente"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Se indica el modelo, el esquema y la colección a usar mongoose
module.exports = model("TodoModel", todoSchema, "todos");