const mongoose = require('mongoose');
const Acudientes = mongoose.connection.collection('acudientes');
const DiarioAula = require('../models/diarioAula.model');
const axios = require('axios');
const Acudiente = require('../models/Acudiente.js');

exports.crearEntrada = async (req, res) => {
  try {
    const datos = req.body;

    // Buscar acudientes solo si hay observaciones con "enviar_a_padre"
    const observacionesConAcudiente = await Promise.all(
      datos.observaciones_individuales.map(async (obs) => {
        if (obs.enviar_a_padre) {
          const acudiente = await Acudientes.findOne({
            nombre_estudiante: obs.nombre_estudiante,
            grupo: datos.grupo
          });

          if (acudiente) {
            // Enviar mensaje al acudiente
            try {
              await axios.post('https://asistente-whatsapp-v4no.onrender.com', {
                telefono: acudiente.telefono_acudiente,
                mensaje: `Hola ${acudiente.nombre_acudiente}, se ha registrado la siguiente observación sobre ${obs.nombre_estudiante}: "${obs.observacion}".`
              });
              console.log(`📨 Mensaje enviado a ${acudiente.telefono_acudiente}`);
            } catch (error) {
              console.error('❌ Error al enviar mensaje:', error.message);
            }

            return {
              ...obs,
              acudiente: {
                nombre: acudiente.nombre_acudiente,
                correo: acudiente.correo_acudiente,
                telefono: acudiente.telefono_acudiente
              }
            };
          } else {
            return {
              ...obs,
              acudiente: { error: 'No se encontró acudiente' }
            };
          }
        } else {
          return obs;
        }
      })
    );

    const nuevaEntrada = new DiarioAula({
      ...datos,
      observaciones_individuales: observacionesConAcudiente
    });

    const guardado = await nuevaEntrada.save();
    res.status(201).json(guardado);
  } catch (error) {
    console.error('❌ Error al guardar entrada:', error);
    res.status(500).json({ mensaje: 'Error al guardar entrada', error });
  }
};



exports.obtenerEntradas = async (req, res) => {
  try {
    const { grupo, fecha } = req.query;
    const filtro = {};
    if (grupo) filtro.grupo = grupo;
    if (fecha) filtro.fecha = new Date(fecha);
    const entradas = await DiarioAula.find(filtro);
    res.json(entradas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener entradas', error });
  }
};

exports.actualizarEntrada = async (req, res) => {
  try {
    const actualizada = await DiarioAula.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar entrada', error });
  }
};

exports.eliminarEntrada = async (req, res) => {
  try {
    await DiarioAula.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Entrada eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar entrada', error });
  }
};
