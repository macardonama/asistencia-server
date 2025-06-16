const express = require('express');
const router = express.Router();
const { getDb } = require('../conexion');

// Nuevo endpoint de ranking procesado en backend
router.get('/ranking', async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection('respuestas');

    const grupo = req.query.grupo;
    const fechaInicio = new Date(req.query.fechaInicio);
    const fechaFin = new Date(req.query.fechaFin);
    fechaFin.setDate(fechaFin.getDate() + 1);  // incluir todo el día fin

    const filtro = {
      createdAt: { $gte: fechaInicio, $lt: fechaFin }
    };

    if (grupo && grupo !== 'Todos') {
      filtro.grupo = grupo;
    }

    const resultados = await collection.aggregate([
      { $match: filtro },
      { $group: {
          _id: "$nombre_estudiante",
          total_puntaje: { $sum: "$puntaje" },
          respuestas: { $sum: 1 }
        }
      },
      { $sort: { total_puntaje: -1 } }
    ]).toArray();

    res.json(resultados);
  } catch (error) {
    console.error("Error al calcular el ranking:", error);
    res.status(500).json({ error: 'Error al calcular ranking' });
  }
});

module.exports = router;
