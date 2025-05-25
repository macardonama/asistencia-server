// models/diarioAula.model.js
const mongoose = require('mongoose');

const ObservacionIndividualSchema = new mongoose.Schema({
  nombre_estudiante: { type: String, required: true },
  observacion: { type: String, required: true },
  enviar_a_padre: { type: Boolean, default: false }
});

const DiarioAulaSchema = new mongoose.Schema({
  grupo: { type: String, required: true },
  fecha: { type: Date, required: true },
  observacion_general: { type: String },
  observaciones_individuales: [ObservacionIndividualSchema]
});

module.exports = mongoose.model('DiarioAula', DiarioAulaSchema);
