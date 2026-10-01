# Fase 1: La Invitación y Experiencia Digital (El Juego)

## 1. Objetivo Principal
Sustituir la invitación tradicional por una experiencia interactiva ("Web App") que atrape la atención del invitado, recolecte la información necesaria para el proyecto y le genere su acceso personal al evento.

## 2. Flujo del Usuario (Paso a Paso)
1. **Splash Screen (Entrada):** Al abrir el link de la invitación, el usuario ve una pantalla de carga elegante (puede incluir el video o animación que mencionaste). Diseño oscuro, profesional y "de caché".
2. **Registro Inicial:** Pantalla minimalista pidiendo: Nombre, Correo y Rol (Profesor, Directivo, etc.).
3. **El Mapa de Niveles:** Una vez registrado, aparece un mapa vertical (estilo línea de tiempo o constelación, muy corporativo). Se presentan 3 "nodos" principales: **Origen, Evolución y Legado**. Solo el nivel 1 está desbloqueado.
4. **Las Preguntas Dinámicas:** Al entrar a un nivel, el sistema selecciona al azar una pregunta de nuestro "banco de preguntas" (para asegurar variedad en las respuestas de todos los invitados).
5. **Generación del Acceso:** Al completar el último nivel, una animación de éxito revela un **Código QR personal**. La pantalla indica la fecha y hora del evento, y le pide al invitado guardar esa pantalla para su acceso.

## 3. ¿Cómo resolvemos los retos técnicos?
* **Evitar duplicados y guardar progreso:** Utilizaremos la memoria local del navegador (`localStorage`). Además, la base de datos verificará el correo electrónico. Si un usuario cierra el navegador por error y vuelve a entrar con su correo, el sistema lo regresará exactamente al nivel donde se quedó. Si ya terminó, lo mandará directo a su QR.
* **Diseño UI/UX:** Se programará con HTML, CSS y JavaScript (posiblemente usando React o Vanilla JS con animaciones CSS fluidas).
* **Hosting:** Lo alojaremos en una plataforma gratuita y ultrarrápida como Vercel o Netlify para que esté disponible 24/7 sin costo.

## 4. Entregable de esta fase
Un link web (ej. `legado3.vercel.app`) funcional donde puedas entrar, registrarte, jugar los niveles y obtener tu QR personal.
