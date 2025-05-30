const express = require('express');
const router = express.Router();
const Pregunta = require('../models/Pregunta');
const Respuesta = require('../models/Respuesta');

// Obtener una pregunta aleatoria
router.get('/pregunta', async (req, res) => {
  const preguntas = await Pregunta.aggregate([{ $sample: { size: 1 } }]);
  if (preguntas.length === 0) {
    return res.status(404).json({ message: 'No hay preguntas disponibles' });
  }
  res.json(preguntas[0]);
});

// Registrar una respuesta
router.post('/respuesta', async (req, res) => {
  const { nombre_estudiante, grupo, pregunta_id, respuesta, tiempo } = req.body;

  try {
    const pregunta = await Pregunta.findById(pregunta_id);
    if (!pregunta) return res.status(404).json({ message: 'Pregunta no encontrada' });

    const correcta = pregunta.respuesta_correcta === respuesta;
    let puntaje = 0;

    if (correcta) {
      puntaje = Math.max(1, 10 - Math.floor(tiempo / 5)); // ejemplo de lógica
    }

    const nuevaRespuesta = new Respuesta({
      nombre_estudiante,
      grupo,
      pregunta_id,
      respuesta,
      tiempo,
      correcta,
      puntaje
    });

    await nuevaRespuesta.save();

    res.json({ correcta, puntaje });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al procesar respuesta' });
  }
});

module.exports = router;
