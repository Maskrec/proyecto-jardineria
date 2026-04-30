-- CreateTable
CREATE TABLE "Personal" (
    "id_empleado" TEXT NOT NULL PRIMARY KEY,
    "nombre_completo" TEXT NOT NULL,
    "email_corporativo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "dirección" TEXT NOT NULL,
    "fecha_nacimiento" DATETIME NOT NULL,
    "estado_laboral" TEXT DEFAULT 'activo'
);

-- CreateTable
CREATE TABLE "Asistencia_nomina" (
    "id_registro" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_empleado" TEXT NOT NULL,
    "hora_entrada" DATETIME NOT NULL,
    "hora_salida" DATETIME,
    "ganancias_dia" DECIMAL NOT NULL,
    "bonos_activos" DECIMAL NOT NULL,
    CONSTRAINT "Asistencia_nomina_id_empleado_fkey" FOREIGN KEY ("id_empleado") REFERENCES "Personal" ("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Permisos" (
    "id_solicitud" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_empleado" TEXT NOT NULL,
    "tipo_permiso" TEXT NOT NULL,
    "fecha_inicio" DATETIME NOT NULL,
    "fecha_fin" DATETIME NOT NULL,
    "estado" TEXT NOT NULL,
    "dias_disponibles" INTEGER NOT NULL,
    CONSTRAINT "Permisos_id_empleado_fkey" FOREIGN KEY ("id_empleado") REFERENCES "Personal" ("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Formación" (
    "id_formacion" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_empleado" TEXT NOT NULL,
    "nombre_curso" TEXT NOT NULL,
    "progreso" INTEGER NOT NULL,
    "fecha_expiracion" DATETIME NOT NULL,
    "reconocimiento" TEXT,
    CONSTRAINT "Formación_id_empleado_fkey" FOREIGN KEY ("id_empleado") REFERENCES "Personal" ("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Proyecto" (
    "id_proyecto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_empleado" TEXT NOT NULL,
    "nombre_proyecto" TEXT NOT NULL,
    "tipo_tarea" TEXT NOT NULL,
    "prioridad" TEXT NOT NULL DEFAULT 'MEDIA',
    "progreso_proyecto" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Proyecto_id_empleado_fkey" FOREIGN KEY ("id_empleado") REFERENCES "Personal" ("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Personal_email_corporativo_key" ON "Personal"("email_corporativo");
