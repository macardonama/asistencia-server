// routes/evaluacion.js
const express = require('express');
const router = express.Router();
const Pregunta = require('../models/Pregunta');
const Respuesta = require('../models/Respuesta');
// POST /api/evaluacion/pregunta → crear nueva pregunta
router.post('/pregunta', async (req, res) => {
  try {
    const nueva = new Pregunta(req.body);
    await nueva.save();
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la pregunta' });
  }
});

// GET /api/evaluacion/pregunta → obtener pregunta aleatoria
router.get('/pregunta', async (req, res) => {
  try {
    const preguntas = await Pregunta.find();
    const aleatoria = preguntas[Math.floor(Math.random() * preguntas.length)];
    res.json(aleatoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la pregunta' });
  }
});

// POST /api/evaluacion/respuesta → validar respuesta
// POST /api/evaluacion/respuesta → validar y guardar respuesta
router.post('/respuesta', async (req, res) => {
  try {
    const { pregunta_id, respuesta, nombre_estudiante, grupo, tiempo } = req.body;
    const pregunta = await Pregunta.findById(pregunta_id);

    if (!pregunta) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }

    const correcta = pregunta.respuesta_correcta === respuesta;

    const nuevaRespuesta = new Respuesta({
      nombre_estudiante,
      grupo,
      pregunta_id,
      respuesta,
      tiempo,
      correcta,
      puntaje: correcta ? calcularPuntaje(tiempo) : 0
    });

    await nuevaRespuesta.save();

    res.status(201).json({
      mensaje: 'Respuesta guardada',
      correcta,
      puntaje: nuevaRespuesta.puntaje
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al validar o guardar la respuesta' });
  }
});

// función auxiliar para puntaje por tiempo
function calcularPuntaje(tiempo) {
  if (tiempo <= 5000) return 10;
  if (tiempo <= 10000) return 8;
  if (tiempo <= 15000) return 6;
  return 4;
}


module.exports = router;
