Set-Content -Path "CHANGELOG.md" -Encoding utf8 -Value '# Bitácora de Proyecto - Wolf Pet

Todas las notas notables de este proyecto serán documentadas en este archivo.
El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---
# Bitácora de Proyecto - Wolf Pet

# Bitácora de Desarrollo - Sprint 2

## Branch: `sprint-2-dsashboard-express`
**Fecha:** 31 de Agosto, 2026

### 🚀 Novedades y Avances
- **Listado General de Pacientes (`/pacientes/page.tsx`):**
  - Implementación de tarjeta de pacientes con búsqueda por nombre, especie, raza o tutor.
  - Integración de consulta asíncrona con cliente Supabase.
- **Formulario de Alta (`/pacientes/nuevo/page.tsx`):**
  - Formulario estructurado para registro de nuevos animales (nombre, especie, raza, peso, tutor, vet cabecera).
  - Manejo de redirección dinámica e inserción en la tabla `mascotas`.
- **Ficha Clínica Dinámica (`/pacientes/[id]/page.tsx`):**
  - Corrección de enrutamiento por carpetas dinámicas usando la API `use(params)` de React/Next.js 15+.
  - Renderizado de tarjetas de información general del paciente e historial clínico base.

### 🛠️ Correcciones e Infraestructura
- Se alineó la estructura del schema cache de Supabase mediante script `ALTER TABLE` para incluir columnas sanitarias y del tutor.
- Corrección de sintaxis y nombrado estandarizado de funciones de componentes exportadas por página (`PacientesPage`, `NuevoPacientePage`, `FichaClinicaPage`).

### 📌 Próximos Pasos (Sprint 2 / Dashboard)
- [ ] Implementar componentes para registro de evoluciones médicas dentro de `/pacientes/[id]`.
- [ ] Diseñar el panel general de métricas (dashboard express).
- [ ] Pull Request de `sprint-2-dsashboard-express` hacia `main` / `dev`.

## [Sprint 2] - Ficha Clínica, Dashboard y Backend Express
**Período:** Septiembre 2026  
**Rama de origen:** `feature/sprint-2-ficha-clinica`  
**Estado:** En Progreso 🚧

### ⚙️ Backend (Express.js)
- [ ] Inicializar servidor base en Node.js + Express.

### 📱 Frontend & UX (Next.js)
- [ ] Vista `/pacientes` (Listado + Buscador).
- [ ] Vista `/pacientes/[id]` (Ficha clínica y solapas).

---
## [Sprint 1] - Infraestructura Base y Alta de Pacientes
**Período:** Agosto 2026
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