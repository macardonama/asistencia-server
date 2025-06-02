const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const Asistencia = require('./models/Asistencia');
const diarioAulaRoutes = require('./routes/diarioAula.routes');
const evaluacionRoutes = require('./routes/evaluacion');
const acudientesRoutes = require('./routes/acudientes.routes');
const app = express();


const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/diario-aula', diarioAulaRoutes);
app.use('/api/evaluacion', evaluacionRoutes);
app.use('/api/acudientes', acudientesRoutes);
// Conectar a MongoDB
connectDB();

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('✅ API funcionando con MongoDB');
});

// ✅ GUARDAR ASISTENCIA en MongoDB
app.post('/guardarAsistencia', async (req, res) => {
  const nuevosDatos = req.body;
  console.log('📥 Recibido:', nuevosDatos);

  try {
    const resultado = await Asistencia.insertMany(nuevosDatos);
    res.status(201).json({ mensaje: "✅ Asistencia guardada en MongoDB", resultado });
  } catch (err) {
    console.error('❌ Error al guardar:', err);
    res.status(500).json({ error: 'Error al guardar asistencia' });
  }
});

// ✅ OBTENER TODA LA ASISTENCIA
app.get('/obtenerAsistencia', async (req, res) => {
  try {
    const registros = await Asistencia.find().sort({ fecha: -1 });
    res.json(registros);
  } catch (err) {
    console.error(err); // 👈 Asegúrate de tener esto
    res.status(500).json({ error: 'Error al obtener asistencia' });
  }
});

// ✅ OBTENER ASISTENCIA POR GRUPO Y FECHA
app.get('/obtenerAsistenciaPorGrupoYFecha', async (req, res) => {
  const { grupo, fecha } = req.query;

  if (!grupo || !fecha) {
    return res.status(400).json({ error: 'Debes proporcionar grupo y fecha' });
  }

  try {
    const asistencia = await Asistencia.find({ grupo, fecha });
    res.json(asistencia);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al buscar asistencia' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
