// routes/evaluacion.js
const express = require('express');
const router = express.Router();
const Pregunta = require('../models/Pregunta');

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
router.post('/respuesta', async (req, res) => {
  try {
    const { pregunta_id, respuesta } = req.body;
    const pregunta = await Pregunta.findById(pregunta_id);

    if (!pregunta) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }

    const correcta = pregunta.respuesta_correcta === respuesta;
    res.json({ correcta });
  } catch (error) {
    res.status(500).json({ error: 'Error al validar la respuesta' });
  }
});

module.exports = router;
