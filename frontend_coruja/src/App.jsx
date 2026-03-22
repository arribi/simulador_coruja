import { useState, useEffect } from 'react'

function App() {
  const [detecciones, setDetecciones] = useState([]);

  // Función para pedir los datos al backend
  const obtenerDatos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3001/api/detecciones');
      const datos = await respuesta.json();
      setDetecciones(datos);
    } catch (error) {
      console.error("Error al conectar con el backend", error);
    }
  };

  // useEffect para que pregunte al backend cada 3 segundos (Polling)
  useEffect(() => {
    obtenerDatos(); // Primera llamada
    const intervalo = setInterval(obtenerDatos, 3000);
    return () => clearInterval(intervalo); // Limpieza
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Proyecto Coruja - Centro de Control</h1>
      <p>Monitorización en tiempo real desde NVIDIA Jetson</p>

      <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
        {detecciones.length === 0 ? (
          <p>Esperando telemetría del dron...</p>
        ) : (
          detecciones.map((det, index) => (
            <div
              key={index}
              style={{
                // Evaluamos si es una alerta para reutilizar la variable
                backgroundColor: det.objeto.includes('Enferma') || det.objeto.includes('Falta') ? '#fff0f0' : '#f0fff0',
                border: '1px solid #ccc',
                // Añadimos un borde lateral muy grueso y rojo/verde
                borderLeft: det.objeto.includes('Enferma') || det.objeto.includes('Falta') ? '8px solid #ff4444' : '8px solid #00C851',
                padding: '1rem',
                borderRadius: '8px',
                // Forzamos el texto a gris muy oscuro para que se lea bien aunque Vite esté en modo oscuro
                color: '#333',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem 0' }}>{det.objeto}</h3>
              <p style={{ margin: 0 }}><strong>Confianza IA:</strong> {Math.round(det.confianza * 100)}%</p>
              <p style={{ margin: 0 }}><strong>Hora:</strong> {det.timestamp}</p>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>
                📍 Lat: {det.coordenadas.lat.toFixed(4)} | Lng: {det.coordenadas.lng.toFixed(4)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App