# Backend BrightView Landscapes - API Documentation

Esta es la documentación oficial del backend del sistema BrightView Landscapes para desarrolladores frontend. Aquí encontrarás todo lo necesario para conectar tu aplicación web o móvil con la API de forma rápida y sencilla.

## Tecnologías Principales
- **Framework:** NestJS (TypeScript)
- **ORM:** Prisma (v7 Early Access)
- **Base de Datos:** PostgreSQL
- **Autenticación:** JWT (JSON Web Tokens)
- **Validación:** class-validator

---

## Configuración Rápida para Frontend Developers

Sigue estos pasos para arrancar el backend en tu entorno local y empezar a desarrollar contra él:

### 1. Instalar dependencias
Asegúrate de tener Node.js instalado. Abre la terminal en la raíz del backend y ejecuta:
```bash
npm install
```

### 2. Configurar Variables de Entorno
Crea un archivo llamado `.env` en la raíz del proyecto y agrega tus variables locales. 
```env
DATABASE_URL="postgresql://postgres:TU_PASSWORD@localhost:5432/brightview_db"
JWT_SECRET="super-secreto-brightview-2026-XD"
```
*Nota: Asegúrate de que la base de datos `brightview_db` esté creada en tu servidor PostgreSQL local.*

### 3. Levantar la Base de Datos
Para crear todas las tablas en tu base de datos local:
```bash
npx prisma db push
```

### 4. Iniciar el Servidor de Desarrollo
```bash
npm run start:dev
```
¡Listo! La API estará corriendo en la URL base:
**http://localhost:3000**

---

## Pruebas y Exploración Rápida (Recomendado)

### Opción A: Probar directo desde VS Code
Hemos incluido un archivo llamado `api-tests.http` en la raíz del proyecto. Si instalas la extensión **"REST Client"** en VS Code, podrás probar todos los endpoints con un solo click.

1. Abre `api-tests.http`.
2. Busca la petición **1. LOGIN - Obtener Token con el Admin existente**.
3. Haz click en `Send Request`. 
4. El token se guardará automáticamente en una variable oculta y podrás ejecutar el resto de las peticiones (CREAR EMPLEADO, CREAR ASISTENCIA, etc.) de forma secuencial sin configurar nada más.

**Credenciales Admin por defecto (ya inyectadas en tu DB local):**
- **Email:** `admin@brightview.com`
- **Password:** `Admin123!`

### Opción B: Swagger UI interactivo
Si prefieres una interfaz gráfica en el navegador, visita:
**http://localhost:3000/api**
Allí podrás ver todos los schemas, DTOs exactos y probar los endpoints interactuando visualmente.

---

## Autenticación y Seguridad

La API utiliza JWT. **Todos los endpoints (excepto el login)** requieren que envíes un token en el header `Authorization` de tu petición HTTP.

### Ejemplo de Login desde el Frontend (fetch/axios)

```javascript
const response = await fetch('http://localhost:3000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email_corporativo: 'admin@brightview.com',
    password: 'Admin123!'
  })
});

const data = await response.json();
// data.access_token contiene el JWT
localStorage.setItem('token', data.access_token);
```

### Ejemplo de Petición Autenticada

En tus siguientes llamadas (por ejemplo, para obtener asistencias), deberás agregar el token al header así:

```javascript
const token = localStorage.getItem('token');
const asistencias = await fetch('http://localhost:3000/asistencia?id_empleado=002-BV', {
  headers: {
    'Authorization': `Bearer ${token}` // <--- IMPORTANTE
  }
});
```

*(Nota: CORS está configurado para aceptar peticiones locales del frontend).*

---

## Estructura de Endpoints Principales

Aquí tienes un resumen rápido. Recuerda consultar Swagger o `api-tests.http` para los detalles de todos los campos exactos.

### Gestión de Personal
- `POST /personal/onboarding/init`: Crea el primer admin (solo si la DB está vacía).
- `POST /personal/onboarding`: Registra a un nuevo empleado (requiere token ADMIN o RH).

### Asistencias
- `POST /asistencia`: Registra entrada (hora, ganancias, etc.).
- `PATCH /asistencia/:id`: Actualiza asistencia (ej. registra hora de salida).
- `GET /asistencia?id_empleado=XXX`: Lista asistencias de un empleado.

### Permisos
- `POST /permisos`: Solicita un permiso (VACACION, CITA_MEDICA, etc.).
- `PATCH /permisos/:id/estado`: Aprueba/Rechaza (solo ADMIN/RH).
- `GET /permisos?id_empleado=XXX`: Lista permisos de un empleado.

### Formación
- `POST /formacion`: Asigna curso a un empleado (solo ADMIN/RH).
- `PATCH /formacion/:id`: Actualiza progreso (0 a 100).
- `GET /formacion?id_empleado=XXX`: Lista formaciones de un empleado.

---

## Manejo de Errores

El backend siempre devolverá un JSON estructurado cuando algo falle. Es importante que el frontend lo capture para mostrar mensajes amigables al usuario (por ejemplo, en toasts o alertas):

```json
{
  "statusCode": 400,
  "message": ["email_corporativo must be an email"],
  "error": "Bad Request"
}
```

Códigos más comunes que deberás interceptar en el Front:
- **`200 / 201`**: Éxito.
- **`400 Bad Request`**: Faltan datos o tienen formato incorrecto en el formulario enviado.
- **`401 Unauthorized`**: El token no fue enviado o ya expiró (Deberás desloguear al usuario y enviarlo a la pantalla de Login).
- **`403 Forbidden`**: El usuario está logueado pero no tiene permisos para esa acción (ej. un Empleado intentando acceder a panel de RRHH).
- **`404 Not Found`**: El recurso solicitado no existe.

---

## Comandos Útiles para el Frontend Dev

**Ver la base de datos visualmente:**
```bash
npx prisma studio
```
Esto abrirá un panel en tu navegador (normalmente `http://localhost:5555`) donde puedes ver, editar y borrar registros directamente en la base de datos sin usar la API. Es indispensable para depurar si tus datos están llegando bien al backend.

**Resetear la base de datos completa:**
```bash
npm run db:reset
```
Borra todo y vuelve a crear las tablas de cero. Muy útil si durante el desarrollo la base de datos se llena de datos basura de prueba.
