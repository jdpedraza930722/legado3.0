# Fase 2: Base de Datos y Lógica del QR (El Efecto WOW)

## 1. Objetivo Principal
Asegurar que todas las respuestas de los invitados se almacenen de forma segura y centralizada para entrenar a la IA posteriormente, y crear una experiencia de entrada al evento fluida y tecnológicamente sorprendente.

## 2. La Base de Datos (El Cerebro de Datos)
Para mantener los costos en cero y la integración sencilla, utilizaremos **Google Sheets** como base de datos.
* Cada vez que un invitado responde una pregunta en la Fase 1, la Web App envía esos datos en segundo plano.
* En el Google Sheet tendremos columnas como: `[Timestamp, ID_Unico, Nombre, Correo, Pregunta_Asignada, Respuesta_Dada, Estado_Asistencia, Numero_Mesa]`.
* Esta hoja de cálculo será el "corpus" de conocimiento que leerá la Inteligencia Artificial en la Fase 3.

## 3. La Lógica del Check-In (Escaneo de QR)
Para lograr el efecto que solicitaste (que el celular del profesor cambie mágicamente), lo estructuraremos así:

1. **La Web del Invitado:** Cuando el profesor llega al evento, saca su celular y abre el link de su invitación, mostrando su QR. Internamente, esa página web está "preguntándole" constantemente a la base de datos (cada 2 segundos): *"¿Ya me escanearon? ¿Ya me escanearon?"* (Técnica de Polling).
2. **La Web del Escáner:** Crearemos una segunda aplicación web oculta (solo para el equipo de protocolo de alumnos). Esta web activa la cámara del celular del estudiante.
3. **El Momento Mágico:**
   * El alumno escanea el QR del profesor.
   * La app del alumno actualiza la base de datos cambiando el estado a "Llegó".
   * Un segundo después, el celular del profesor detecta el cambio en la base de datos. Su código QR desaparece con una animación elegante y en su pantalla se muestra: **"Bienvenido Dr. [Nombre], es un honor recibirlo. Por favor, pase a la Mesa [X]."**

## 4. Entregable de esta fase
La integración completada: Las respuestas guardándose solas en tu Google Sheet, la app de escáner para la cámara, y la animación "mágica" funcionando entre dos teléfonos distintos en tiempo real.
