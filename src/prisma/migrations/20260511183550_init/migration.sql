-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'RH', 'JEFE_CUADRILLA', 'EMPLEADO');

-- CreateEnum
CREATE TYPE "Estado_laboral" AS ENUM ('activo', 'inactivo', 'onboarding');

-- CreateEnum
CREATE TYPE "Tipo_permiso" AS ENUM ('VACACION', 'CITA_MEDICA', 'ASUNTOS_PERSONALES');

-- CreateEnum
CREATE TYPE "Estado_solicitud" AS ENUM ('PENDIENTE', 'APROBADA', 'RECHAZADA');

-- CreateEnum
CREATE TYPE "Prioridad" AS ENUM ('ALTA', 'MEDIA', 'BAJA');

-- CreateTable
CREATE TABLE "Personal" (
    "id_empleado" TEXT NOT NULL,
    "nombre_completo" TEXT NOT NULL,
    "email_corporativo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EMPLEADO',
    "telefono" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "direccion" TEXT,
    "fecha_nacimiento" TIMESTAMP(3) NOT NULL,
    "estado_laboral" "Estado_laboral" DEFAULT 'activo',
    "dias_disponibles" INTEGER NOT NULL DEFAULT 14,

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("id_empleado")
);

-- CreateTable
CREATE TABLE "Asistencia_nomina" (
    "id_registro" SERIAL NOT NULL,
    "id_empleado" TEXT NOT NULL,
    "hora_entrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hora_salida" TIMESTAMP(3),
    "ganancias_dia" DECIMAL(10,2) NOT NULL,
    "bonos_activos" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Asistencia_nomina_pkey" PRIMARY KEY ("id_registro")
);

-- CreateTable
CREATE TABLE "Permisos" (
    "id_solicitud" SERIAL NOT NULL,
    "id_empleado" TEXT NOT NULL,
    "tipo_permiso" "Tipo_permiso" NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "estado" "Estado_solicitud" NOT NULL DEFAULT 'PENDIENTE',

    CONSTRAINT "Permisos_pkey" PRIMARY KEY ("id_solicitud")
);

-- CreateTable
CREATE TABLE "Formacion" (
    "id_formacion" SERIAL NOT NULL,
    "id_empleado" TEXT NOT NULL,
    "nombre_curso" TEXT NOT NULL,
    "progreso" INTEGER NOT NULL DEFAULT 0,
    "fecha_expiracion" TIMESTAMP(3) NOT NULL,
    "reconocimiento" TEXT,

    CONSTRAINT "Formacion_pkey" PRIMARY KEY ("id_formacion")
);

-- CreateTable
CREATE TABLE "Proyecto" (
    "id_proyecto" SERIAL NOT NULL,
    "id_empleado" TEXT NOT NULL,
    "nombre_proyecto" TEXT NOT NULL,
    "tipo_tarea" TEXT NOT NULL,
    "prioridad" "Prioridad" NOT NULL DEFAULT 'MEDIA',
    "progreso_proyecto" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Proyecto_pkey" PRIMARY KEY ("id_proyecto")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personal_email_corporativo_key" ON "Personal"("email_corporativo");

-- AddForeignKey
ALTER TABLE "Asistencia_nomina" ADD CONSTRAINT "Asistencia_nomina_id_empleado_fkey" FOREIGN KEY ("id_empleado") REFERENCES "Personal"("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permisos" ADD CONSTRAINT "Permisos_id_empleado_fkey" FOREIGN KEY ("id_empleado") REFERENCES "Personal"("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formacion" ADD CONSTRAINT "Formacion_id_empleado_fkey" FOREIGN KEY ("id_empleado") REFERENCES "Personal"("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proyecto" ADD CONSTRAINT "Proyecto_id_empleado_fkey" FOREIGN KEY ("id_empleado") REFERENCES "Personal"("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE;
