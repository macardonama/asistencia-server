const express = require('express');
const router = express.Router();
const Acudiente = require('../models/Acudiente');

router.get('/estudiantes', async (req, res) => {
  try {
    const estudiantes = await Acudiente.find({}, 'nombre_estudiante grupo -_id'); // solo nombre y grupo
    res.json(estudiantes);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error.message);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

module.exports = router;
