# Respuestas Esperadas de las Pruebas API

Aquí está lo que debes esperar de cada petición:

---

## 1. LOGIN - Obtener Token
**Código esperado:** 201 Created (o 200 OK)

**Respuesta esperada:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE1NDIwMjc5LCJleHAiOjE3MTU1MDY2Nzl9.xxxxx",
  "user": {
    "id": 1,
    "id_empleado": "001-BV",
    "nombre_completo": "Admin System",
    "email_corporativo": "admin@brightview.com",
    "role": "ADMIN"
  }
}
```

**Acción:** Copia el valor de `access_token` (sin las comillas) y pégalo en la variable `@auth_token` al inicio del archivo.

---

## 2. INITIAL ONBOARDING - Crear Primer Admin
**Código esperado:** 201 Created

**Respuesta esperada:**
```json
{
  "id": 1,
  "id_empleado": "001-BV",
  "nombre_completo": "Admin System",
  "email_corporativo": "admin@brightview.com",
  "role": "ADMIN",
  "telefono": "555-0100",
  "cargo": "Administrador",
  "departamento": "Administracion",
  "direccion": "123 Admin St",
  "fecha_nacimiento": "1980-01-01",
  "estado_laboral": "ACTIVO",
  "fecha_creacion": "2026-05-11T18:24:39.000Z",
  "fecha_actualizacion": "2026-05-11T18:24:39.000Z"
}
```

**Qué significa:** El primer usuario admin fue creado exitosamente.

---

## 3. CREAR EMPLEADO
**Código esperado:** 201 Created

**Respuesta esperada:**
```json
{
  "id": 2,
  "id_empleado": "002-BV",
  "nombre_completo": "Juan Perez Garcia",
  "email_corporativo": "juan.perez@brightview.com",
  "role": "EMPLEADO",
  "telefono": "555-0200",
  "cargo": "Jardinero",
  "departamento": "Operaciones",
  "direccion": "456 Employee Ave",
  "fecha_nacimiento": "1990-05-15",
  "estado_laboral": "ACTIVO",
  "fecha_creacion": "2026-05-11T18:25:10.000Z",
  "fecha_actualizacion": "2026-05-11T18:25:10.000Z"
}
```

**Qué significa:** El empleado fue creado exitosamente. Nota el ID = 2.

---

## 4. CREAR ASISTENCIA
**Código esperado:** 201 Created

**Respuesta esperada:**
```json
{
  "id": 1,
  "id_personal": 2,
  "fecha": "2024-12-19",
  "hora_entrada": "08:00:00",
  "hora_salida": "16:00:00",
  "tipo_asistencia": "PRESENTE",
  "notas": "Trabajo regular",
  "fecha_creacion": "2026-05-11T18:25:45.000Z"
}
```

**Qué significa:** El registro de asistencia fue creado. Este es el ID 1 que usarás en la próxima petición.

---

## 5. ACTUALIZAR ASISTENCIA
**Código esperado:** 200 OK

**Respuesta esperada:**
```json
{
  "id": 1,
  "id_personal": 2,
  "fecha": "2024-12-19",
  "hora_entrada": "08:00:00",
  "hora_salida": "17:00:00",
  "tipo_asistencia": "PRESENTE",
  "notas": "Trabajo con hora extra",
  "fecha_creacion": "2026-05-11T18:25:45.000Z"
}
```

**Qué significa:** La asistencia fue actualizada. La hora_salida cambió de 16:00:00 a 17:00:00.

---

## 6. LISTAR ASISTENCIAS
**Código esperado:** 200 OK

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "id_personal": 2,
    "fecha": "2024-12-19",
    "hora_entrada": "08:00:00",
    "hora_salida": "17:00:00",
    "tipo_asistencia": "PRESENTE",
    "notas": "Trabajo con hora extra",
    "fecha_creacion": "2026-05-11T18:25:45.000Z"
  }
]
```

**Qué significa:** Devuelve un array (lista) con todos los registros de asistencia del empleado 2. En este caso solo hay uno.

---

## 7. CREAR PERMISO
**Código esperado:** 201 Created

**Respuesta esperada:**
```json
{
  "id": 1,
  "id_personal": 2,
  "tipo_permiso": "VACACIONES",
  "fecha_inicio": "2024-12-25",
  "fecha_fin": "2024-12-27",
  "motivo": "Vacaciones de Navidad",
  "estado": "PENDIENTE",
  "fecha_creacion": "2026-05-11T18:26:20.000Z"
}
```

**Qué significa:** La solicitud de permiso fue creada. El estado es PENDIENTE (en espera de aprobación).

---

## 8. APROBAR PERMISO
**Código esperado:** 200 OK

**Respuesta esperada:**
```json
{
  "id": 1,
  "id_personal": 2,
  "tipo_permiso": "VACACIONES",
  "fecha_inicio": "2024-12-25",
  "fecha_fin": "2024-12-27",
  "motivo": "Vacaciones de Navidad",
  "estado": "APROBADO",
  "comentarios_aprobacion": "Aprobado por RRHH",
  "fecha_creacion": "2026-05-11T18:26:20.000Z",
  "fecha_aprobacion": "2026-05-11T18:26:35.000Z"
}
```

**Qué significa:** El estado del permiso cambió de PENDIENTE a APROBADO.

---

## 9. LISTAR PERMISOS
**Código esperado:** 200 OK

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "id_personal": 2,
    "tipo_permiso": "VACACIONES",
    "fecha_inicio": "2024-12-25",
    "fecha_fin": "2024-12-27",
    "motivo": "Vacaciones de Navidad",
    "estado": "APROBADO",
    "comentarios_aprobacion": "Aprobado por RRHH",
    "fecha_creacion": "2026-05-11T18:26:20.000Z",
    "fecha_aprobacion": "2026-05-11T18:26:35.000Z"
  }
]
```

**Qué significa:** Devuelve un array con todos los permisos del empleado 2.

---

## 10. CREAR FORMACION
**Código esperado:** 201 Created

**Respuesta esperada:**
```json
{
  "id": 1,
  "id_personal": 2,
  "titulo": "Manejo Seguro de Herramientas",
  "descripcion": "Curso de seguridad en jardineria",
  "fecha_inicio": "2024-12-20",
  "fecha_fin": "2024-12-21",
  "duracion_horas": 8,
  "instructor": "Juan Martinez",
  "estado": "PROGRAMADO",
  "tipo_formacion": "SEGURIDAD",
  "fecha_creacion": "2026-05-11T18:27:00.000Z"
}
```

**Qué significa:** El curso de formación fue creado. El estado es PROGRAMADO.

---

## 11. ACTUALIZAR FORMACION
**Código esperado:** 200 OK

**Respuesta esperada:**
```json
{
  "id": 1,
  "id_personal": 2,
  "titulo": "Manejo Seguro de Herramientas",
  "descripcion": "Curso de seguridad en jardineria",
  "fecha_inicio": "2024-12-20",
  "fecha_fin": "2024-12-21",
  "duracion_horas": 8,
  "instructor": "Juan Martinez",
  "estado": "COMPLETADO",
  "tipo_formacion": "SEGURIDAD",
  "fecha_completado": "2024-12-21",
  "calificacion": 95,
  "comentarios": "Excelente participacion",
  "fecha_creacion": "2026-05-11T18:27:00.000Z"
}
```

**Qué significa:** El curso fue marcado como COMPLETADO con una calificación de 95.

---

## 12. LISTAR FORMACIONES
**Código esperado:** 200 OK

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "id_personal": 2,
    "titulo": "Manejo Seguro de Herramientas",
    "descripcion": "Curso de seguridad en jardineria",
    "fecha_inicio": "2024-12-20",
    "fecha_fin": "2024-12-21",
    "duracion_horas": 8,
    "instructor": "Juan Martinez",
    "estado": "COMPLETADO",
    "tipo_formacion": "SEGURIDAD",
    "fecha_completado": "2024-12-21",
    "calificacion": 95,
    "comentarios": "Excelente participacion",
    "fecha_creacion": "2026-05-11T18:27:00.000Z"
  }
]
```

**Qué significa:** Devuelve un array con todos los cursos del empleado 2.

---

## Resumen de Códigos de Estado HTTP

| Código | Significa |
|--------|-----------|
| 200 OK | Petición exitosa (GET, PATCH, PUT) |
| 201 Created | Recurso creado exitosamente (POST) |
| 400 Bad Request | Datos invalidos en el request |
| 401 Unauthorized | Token faltante o invalido |
| 403 Forbidden | No tienes permisos para hacer esto |
| 404 Not Found | Recurso no existe |
| 409 Conflict | Conflicto (ej: email duplicado) |
| 500 Internal Server Error | Error en el servidor |

---

## Si algo falla

Si alguna petición no funciona como se espera, aquí están los problemas comunes:

**Error 401 Unauthorized:**
- El token está vencido o vacío
- Solución: Vuelve a hacer login y copia el token nuevamente

**Error 400 Bad Request:**
- Falta un campo requerido o tiene un formato incorrecto
- Solución: Revisa los datos que envías

**Error 409 Conflict:**
- El email ya está registrado
- Solución: Usa otro email o resetea la base de datos

**Error 500 Internal Server Error:**
- Algo falló en el servidor
- Solución: Revisa la consola del servidor para ver el error exacto