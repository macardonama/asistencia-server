// routes/diarioAula.routes.js
const express = require('express');
const router = express.Router();
const controlador = require('../controllers/diarioAula.controller.js');

router.post('/', controlador.crearEntrada);
router.get('/', controlador.obtenerEntradas);
router.put('/:id', controlador.actualizarEntrada);
router.delete('/:id', controlador.eliminarEntrada);
router.get('/filtrar', diarioAulaController.filtrarDiarioAula);//Este nombre no coincide con el de arriba
module.exports = router; // ✅ Esta línea es imprescindible
