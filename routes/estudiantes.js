const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// Ruta para obtener todos los estudiantes (nombre + grupo)
router.get('/estudiantes', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('asistencia');
    const collection = database.collection('acudientes');

    // Ajustado a los campos reales: nombre_estudiante y grupo
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
