const express = require('express');
const router = express.Router();
const conectarDB = require('../db');

router.get('/estudiantes', async (req, res) => {
  try {
    const db = await conectarDB();
    const collection = db.collection('acudientes');

    const estudiantes = await collection.find({}, {
      projection: { _id: 0, nombre_estudiante: 1, grupo: 1 }
    }).toArray();

    res.json(estudiantes);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

module.exports = router;
