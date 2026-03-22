import requests
import time
import random

# Esta es la dirección de nuestra futura API en Node.js 
API_URL = "http://coruja-backend.onrender.com/api/detecciones"

def simular_vuelo():
    print("Iniciando simulador de la NVIDIA Jetson del dron...")
    print("Pulsar Ctrl+C para detener el vuelo.\n")
    
    objetos = ["Oveja Sana", "Oveja Enferma", "Mala Hierba", "Falta de Riego"]
    
    while True:
        # Generamos un dato falso
        deteccion = {
            "objeto": random.choice(objetos),
            "confianza": round(random.uniform(0.70, 0.99), 2),
            "coordenadas": {
                "lat": 28.4682 + random.uniform(-0.01, 0.01), 
                "lng": -16.2546 + random.uniform(-0.01, 0.01)
            }
        }
        
        try:
            # Enviamos el dato como JSON mediante un POST
            respuesta = requests.post(API_URL, json=deteccion)
            print(f"Enviado: {deteccion['objeto']} ({deteccion['confianza'] * 100:.0f}%) -> Respuesta API: {respuesta.status_code}")
        except requests.exceptions.ConnectionError:
            print(f"Error: No se encuentra el servidor Node.js en {API_URL}. ¿Está encendido?")
            
        time.sleep(5) # Espera 5 segundos antes de la siguiente detección

if __name__ == "__main__":
    simular_vuelo()