// routes/diarioAula.routes.js
const express = require('express');
const router = express.Router();
const controlador = require('../controllers/diarioAula.controller');

router.post('/', controlador.crearEntrada);
router.get('/', controlador.obtenerEntradas);
router.put('/:id', controlador.actualizarEntrada);
router.delete('/:id', controlador.eliminarEntrada);

module.exports = router; // ✅ Esta línea es imprescindible
