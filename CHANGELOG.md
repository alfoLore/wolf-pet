Set-Content -Path "CHANGELOG.md" -Encoding utf8 -Value '# Bitácora de Proyecto - Wolf Pet

Todas las notas notables de este proyecto serán documentadas en este archivo.
El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [Sprint 1] - Infraestructura Base y Alta de Pacientes
**Período:** Agosto 2026  
**Rama de origen:** `feature/historia-clinica-paciente`  
**Estado:** Completado (Probado en Supabase e integrado)

---

### 🎨 Diseño & UX
- Definición de la interfaz inicial responsive para el alta de pacientes veterinarios.
- Paleta de colores slate/emerald integrada con componentes de feedback visual (alertas, loaders, badges).

### ⚙️ Backend & Base de Datos (Supabase)
- Integración de la librería `@supabase/ssr` para manejo de clientes en navegador y servidor Next.js.
- Definición e implementación de la tabla `mascotas` en PostgreSQL / Supabase con las siguientes columnas:
  - `id` (UUID, Primary Key)
  - `created_at` (Timestamp)
  - `nombre_actual` (Text, NOT NULL)
  - `especie` (Text, NOT NULL)
  - `raza` (Text)
  - `peso_actual` (Numeric)
  - `tutor_nombre` (Text)
  - `veterinario_cabecera` (Text)
- Configuración de políticas de seguridad iniciales RLS (*Row Level Security*) para lectura e inserción.

### 📱 Frontend (Next.js 14+)
- **Creación de cliente:** `src/lib/supabase/client.ts` para interactuar con la API de Supabase en el lado del cliente.
- **Creación de cliente de servidor:** `src/lib/supabase/server.ts` para futuras server actions.
- **Formulario de Alta de Paciente (`/pacientes/nuevo`):**
  - Manejo de estado local (`useState`) para captura de datos de la mascota, tutor y veterinario.
  - Validación de campos requeridos y tipos de datos (conversión de peso a float).
  - Redirección y alertas informativas post-registro.

### 🛠️ Infraestructura & Entorno
- Configuración de variables de entorno `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- Inclusión del archivo `.env.local` en `.gitignore` para protección de credenciales.

---

### 📝 Deuda Técnica & Próximos Pasos (Sprint 2)
- [ ] Definir arquitectura para consumo de API desde entorno móvil (Express.js + PWA / React Native).
- [ ] Implementar la vista de detalle y perfil clínico del paciente (`/pacientes/[id]`).
- [ ] Crear el dashboard/listado general de pacientes con buscador en tiempo real.
'