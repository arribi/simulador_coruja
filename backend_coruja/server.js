const express = require('express');
const cors = require('cors');

const app = express();
const PUERTO = 3001;

app.use(cors());
app.use(express.json());

// Memoria temporal (En el proyecto final, esto será MongoDB)
let historialDetecciones = [];

// El dron envía datos aquí
app.post('/api/detecciones', (req, res) => {
  const datoDron = req.body;
  datoDron.timestamp = new Date().toLocaleTimeString(); // Añadimos la hora

  historialDetecciones.unshift(datoDron); // Lo ponemos al principio de la lista

  // Si la lista crece mucho, borramos los más antiguos para no saturar la memoria
  if (historialDetecciones.length > 20) historialDetecciones.pop();

  console.log(`Recibido: ${datoDron.objeto} - ${datoDron.timestamp}`);
  res.status(200).json({ mensaje: "Dato guardado temporalmente" });
});

// React pide los datos aquí
app.get('/api/detecciones', (req, res) => {
  res.status(200).json(historialDetecciones);
});

app.listen(PUERTO, () => {
  console.log(`Backend escuchando en el puerto ${PUERTO}`);
});