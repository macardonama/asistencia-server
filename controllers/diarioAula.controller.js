// controllers/diarioAula.controller.js
const DiarioAula = require('../models/diarioAula.model');

exports.crearEntrada = async (req, res) => {
  try {
    const nuevaEntrada = new DiarioAula(req.body);
    const guardado = await nuevaEntrada.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al guardar entrada', error });
  }
};

exports.obtenerEntradas = async (req, res) => {
  try {
    const { grupo, fecha } = req.query;
    const filtro = {};
    if (grupo) filtro.grupo = grupo;
    if (fecha) filtro.fecha = new Date(fecha);
    const entradas = await DiarioAula.find(filtro);
    res.json(entradas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener entradas', error });
  }
};

exports.actualizarEntrada = async (req, res) => {
  try {
    const actualizada = await DiarioAula.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar entrada', error });
  }
};

exports.eliminarEntrada = async (req, res) => {
  try {
    await DiarioAula.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Entrada eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar entrada', error });
  }
};
