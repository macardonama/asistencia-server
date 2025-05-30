const mongoose = require('mongoose');

const preguntaSchema = new mongoose.Schema({
  enunciado: { type: String, required: true },
  opciones: [String], // Ej: ["A", "B", "C", "D"]
  respuesta_correcta: { type: String, required: true } // Ej: "B"
});

module.exports = mongoose.model('Pregunta', preguntaSchema);
