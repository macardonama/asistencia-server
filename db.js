const mongoose = require('mongoose');

//const uri = 'mongodb+srv://macardonama:FCvRAwuxbT2vQrcO@cluster0.yeqavsk.mongodb.net/asistencia?retryWrites=true&w=majority&appName=Cluster0'; ESTE ES LOCAL
const uri = process.env.MONGODB_URI;//ESTE PARA RENDER
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB', err);
  }
};

module.exports = connectDB;
