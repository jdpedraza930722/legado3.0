# Fase 3: Inteligencia Artificial e Interfaz de Voz (El Cierre del Evento)

## 1. Objetivo Principal
Transformar todas las respuestas estáticas de los catedráticos en un "Manifiesto del Legado" vivo. Una Inteligencia Artificial conversacional con voz a la que se le pueda hacer preguntas en vivo durante la cena.

## 2. El Cerebro (n8n + LLM + Google Sheets)
Utilizaremos **n8n** como la herramienta de orquestación (el backend automatizado).
* **Entrenamiento (RAG - Retrieval-Augmented Generation):** No vamos a "entrenar" un modelo desde cero (eso es caro y lento). Lo que haremos es configurar un flujo en n8n que haga lo siguiente:
  1. Extrae todas las respuestas del Google Sheet (la sabiduría colectiva de los invitados).
  2. Crea un "Contexto o Prompt del Sistema". Ejemplo: *"Eres el 'Manifiesto del Legado 3.0', una IA creada a partir de las experiencias de 30 catedráticos expertos. Basa todas tus respuestas en esta información: [Insertar respuestas del Sheet]..."*.
  3. Cuando se hace una pregunta nueva, n8n envía esa pregunta junto con todo el contexto a la API de un LLM (como OpenAI o Google Gemini) para generar una respuesta inteligente y tematizada.

## 3. La Interfaz de Voz (Frontend del Evento)
Necesitamos una "cara" para la IA que se proyectará en la pantalla gigante durante el evento.
* Crearemos una interfaz web limpia (ejemplo: fondo oscuro, una esfera brillante central, animaciones que reaccionen al sonido).
* **Flujo en vivo:**
  1. El usuario (un alumno o profesor en el micrófono) presiona un botón en la interfaz web y habla.
  2. El navegador usa la API de Reconocimiento de Voz (Web Speech API) para convertir esa voz en texto.
  3. La web envía ese texto a nuestro flujo de n8n.
  4. n8n procesa la consulta con el LLM y devuelve la respuesta en texto.
  5. La web recibe la respuesta y utiliza una API de Texto-a-Voz (TTS) para que la computadora hable la respuesta en voz alta a través del sistema de sonido del evento.

## 4. Entregable de esta fase
El flujo de automatización en n8n funcional conectado a Google Sheets y la Interfaz Gráfica de Voz (la web de la esfera/ondas) lista para proyectarse y ser utilizada la noche de la Cena de Gala.
