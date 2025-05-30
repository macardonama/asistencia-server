const mongoose = require('mongoose');

const respuestaSchema = new mongoose.Schema({
  nombre_estudiante: { type: String, required: true },
  grupo: { type: String, required: true },
  pregunta_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pregunta', required: true },
  respuesta: { type: String, required: true },
  tiempo: { type: Number, required: true },
  correcta: { type: Boolean },
  puntaje: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Respuesta', respuestaSchema);
