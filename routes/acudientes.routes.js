const express = require('express');
const router = express.Router();
const Acudiente = require('../models/Acudiente');

// POST /api/acudientes → recibe nombre_estudiante y grupo, devuelve datos del acudiente
router.post('/', async (req, res) => {
  const { nombre_estudiante, grupo } = req.body;

  try {
    const acudiente = await Acudiente.findOne({ nombre_estudiante, grupo });

    if (!acudiente) {
      return res.status(404).json({ mensaje: 'Acudiente no encontrado' });
    }

    res.json({
      nombre_acudiente: acudiente.nombre_acudiente,
      telefono_acudiente: acudiente.telefono_acudiente,
      correo_acudiente: acudiente.correo_acudiente
    });
  } catch (error) {
    console.error('Error al buscar acudiente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
