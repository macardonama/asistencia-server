const mongoose = require('mongoose');

const asistenciaSchema = new mongoose.Schema({
  name: String,
  estado: String,
  emoji: String,
  grupo: String
},{timestamps:true});

module.exports = mongoose.model('Asistencia', asistenciaSchema);
