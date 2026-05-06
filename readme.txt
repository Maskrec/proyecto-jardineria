# Backend BrightView Landscapes - Guía de Configuración

Aquí se llevará un control detallado de cómo usar y configurar el backend del sistema BrightView para el correcto funcionamiento y entendimiento por parte de todo el equipo de desarrollo.

# Tecnologías Principales
- Framework: NestJS (TypeScript)
- ORM: Prisma (v7 Early Access)
- Base de Datos: PostgreSQL

# Pasos para levantar el proyecto localmente

# 1. Instalar dependencias
Asegúrate de tener Node.js instalado. Abre la terminal en la raíz del proyecto y ejecuta:

  npm install

# 2. Configurar Variables de Entorno
Crea un archivo llamado `.env` en la raíz del proyecto (al mismo nivel que `package.json`) y agrega las siguientes variables. Ajusta el usuario, contraseña y puerto según la instalación de PostgreSQL en tu computadora:

  DATABASE_URL="postgresql://postgres:equipo3@localhost:5432/brightview_db"
  JWT_SECRET="super-secreto-brightview-2026-XD"

### 3. Configurar la Base de Datos con Prisma
Dado que estamos usando la versión más reciente de Prisma, la configuración principal se encuentra en `prisma.config.ts`.

Para sincronizar el esquema con tu base de datos (crear las tablas) ejecuta:
  
  npx prisma db push

Para generar el cliente tipado de Prisma (necesario cada vez que modificas el schema):
  
  npx prisma generate

Si quieres visualizar e interactuar con la base de datos de manera gráfica desde el navegador, usa:
  
  npx prisma studio

### 4. Levantar el Servidor (NestJS)
Para iniciar el servidor en modo desarrollo (con recarga automática de cambios):
  
  npm run start:dev

El backend estará listo para recibir peticiones, generalmente en http://localhost:3000.
