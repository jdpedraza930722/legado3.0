# Especificaciones Técnicas y Diseño de Base de Datos - LEGADO 3.0

## 1. Stack Tecnológico (Especificaciones)

El proyecto utilizará una arquitectura moderna, escalable y 100% gratuita para el nivel de tráfico esperado. Nos enfocaremos en que la experiencia de usuario (UX) sea impecable.

*   **Frontend (Web App, Juego e Invitación):**
    *   **Librería/Framework:** React.js con Vite (rápido, moderno y eficiente).
    *   **Estilos:** Tailwind CSS (permite maquetar rápidamente, implementar un *Dark Mode* corporativo y mantener consistencia visual).
    *   **Animaciones:** Framer Motion (para transiciones suaves entre niveles, fade-ins y efectos que dan la sensación de una app "premium").
    *   **Hosting:** Vercel (despliegue automático, ultrarrápido y gratuito).
*   **Backend y Base de Datos:**
    *   **Plataforma:** Supabase (alternativa open-source a Firebase basada en PostgreSQL).
    *   **Sincronización:** Supabase Realtime (WebSockets) para actualizar la pantalla del QR y dar la bienvenida al instante sin "refrescar" la página.
*   **Inteligencia Artificial (Fase 3):**
    *   **Orquestador:** n8n (para conectar la base de datos con el LLM y manejar el flujo de voz).
    *   **Modelo de Lenguaje (LLM):** OpenAI (ej. GPT-4o-mini) o Gemini Flash (para respuestas rápidas, económicas y de alta calidad).

---

## 2. Diseño de la Base de Datos (Supabase / PostgreSQL)

Usaremos un esquema relacional limpio (SQL) para mantener la integridad de la información y facilitar la consulta por parte de la IA. Solo necesitamos 3 tablas principales:

### Tabla 1: `guests` (Invitados)
Almacena la identidad de los asistentes y su estado para la entrada.
*   `id` (UUID, Primary Key) - Identificador único generado automáticamente.
*   `name` (Text) - Nombre del invitado.
*   `email` (Text, Unique) - Correo electrónico (actúa como llave para evitar registros duplicados).
*   `role` (Text) - Su rol (Catedrático, Directivo, etc.).
*   `status` (Text) - Estado de entrada. Valor por defecto: `'pending'`. Cambia a `'arrived'` al escanear el QR.
*   `table_number` (Integer, Nullable) - Número de mesa asignada. Se puede configurar días antes del evento.
*   `created_at` (Timestamp) - Fecha y hora de registro.

### Tabla 2: `questions` (Banco de Preguntas)
Almacena el inventario de preguntas posibles para el juego.
*   `id` (Integer, Primary Key)
*   `phase` (Text) - Etapa a la que pertenece: `'Origen'`, `'Evolucion'`, o `'Legado'`.
*   `question_text` (Text) - El texto descriptivo de la pregunta (Ej: "¿Cuál es el mayor reto de la sucesión?").

### Tabla 3: `answers` (Respuestas)
Almacena lo que cada persona contestó. Esta es la tabla que leerá la Inteligencia Artificial.
*   `id` (UUID, Primary Key)
*   `guest_id` (UUID, Foreign Key referenciando a `guests.id`) - ¿Quién dio la respuesta?
*   `question_id` (Integer, Foreign Key referenciando a `questions.id`) - ¿Qué pregunta se le hizo?
*   `response_text` (Text) - El contenido escrito por el invitado.
*   `created_at` (Timestamp) - Momento exacto de la respuesta.

---

## 3. ¿Cómo interactúan estas tablas en la vida real? (El Flujo)

1.  **Registro Inicial:** El profesor entra a la web, escribe su correo y nombre. El sistema inserta un registro en la tabla `guests`.
2.  **Generación de Niveles:** El sistema busca en la tabla `questions` y elige al azar 1 pregunta de Origen, 1 de Evolución y 1 de Legado.
3.  **Captura de Datos:** Cada vez que el profesor supera un nivel, se guarda su respuesta en la tabla `answers` vinculada a su `guest_id`.
4.  **Emisión del QR:** Al finalizar, el QR que se dibuja en la pantalla solo contiene un texto oculto: el `guest_id` del profesor.
5.  **El Check-in y la Magia:**
    *   El alumno escanea el QR (`guest_id`) en la puerta.
    *   La app del alumno actualiza la tabla `guests` y cambia el `status` a `'arrived'`.
    *   El celular del profesor, que está conectado por WebSockets vigilando su propio `guest_id`, detecta el cambio instantáneamente.
    *   El celular lee su campo `table_number` y automáticamente dibuja en la pantalla: *"Bienvenido, pase a la mesa X"*.
