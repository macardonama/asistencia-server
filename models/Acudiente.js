const mongoose = require('mongoose');

const acudienteSchema = new mongoose.Schema({
  nombre_estudiante: { type: String, required: true },
  grupo: { type: String, required: true },
  nombre_acudiente: String,
  correo_acudiente: String,
  telefono_acudiente: String
});

module.exports = mongoose.model('Acudiente', acudienteSchema);
