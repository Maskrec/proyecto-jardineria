# Pruebas Manuales en rest



### Instalar REST Client
1. Abre VS Code
2. Ve a Extensions (Ctrl+Shift+X)
3. Busca "REST Client"
4. Instala la extensión de "Huachao Mao"

### Crear archivo de pruebas en REST Client
Crea un archivo llamado `api-tests.http` en la raíz del proyecto con el siguiente contenido:

```http
### Variables
@base_url = http://localhost:3000
@auth_token = 

### 1. LOGIN - Obtener Token
POST {{base_url}}/auth/login
Content-Type: application/json

{
  "email": "admin@brightview.com",
  "password": "Admin123!"
}

###

### 2. INITIAL ONBOARDING - Crear Primer Admin
POST {{base_url}}/personal/init
Content-Type: application/json

{
  "email": "admin@brightview.com",
  "password": "Admin123!",
  "nombre": "Admin",
  "apellido": "System",
  "telefono": "555-0100",
  "fecha_nacimiento": "1980-01-01",
  "direccion": "123 Admin St",
  "puesto": "Administrador",
  "departamento": "Administracion",
  "fecha_contratacion": "2024-01-01",
  "salario": 50000.00,
  "tipo_contrato": "PERMANENTE",
  "horario_trabajo": "LUN-VIE 9:00-17:00",
  "numero_seguro_social": "123-45-6789",
  "contacto_emergencia": "Emergency Contact",
  "telefono_emergencia": "555-0199",
  "rol": "ADMIN"
}

###

### 3. CREAR EMPLEADO
POST {{base_url}}/personal/onboarding
Authorization: Bearer {{auth_token}}
Content-Type: application/json

{
  "email": "juan.perez@brightview.com",
  "password": "Juan123!",
  "nombre": "Juan",
  "apellido": "Perez",
  "telefono": "555-0200",
  "fecha_nacimiento": "1990-05-15",
  "direccion": "456 Employee Ave",
  "puesto": "Jardinero",
  "departamento": "Operaciones",
  "fecha_contratacion": "2024-01-15",
  "salario": 35000.00,
  "tipo_contrato": "PERMANENTE",
  "horario_trabajo": "LUN-VIE 8:00-16:00",
  "numero_seguro_social": "987-65-4321",
  "contacto_emergencia": "Maria Perez",
  "telefono_emergencia": "555-0299",
  "rol": "EMPLEADO"
}

###

### 4. CREAR ASISTENCIA
POST {{base_url}}/asistencia
Authorization: Bearer {{auth_token}}
Content-Type: application/json

{
  "id_personal": 2,
  "fecha": "2024-12-19",
  "hora_entrada": "08:00:00",
  "hora_salida": "16:00:00",
  "tipo_asistencia": "PRESENTE",
  "notas": "Trabajo regular"
}

###

### 5. ACTUALIZAR ASISTENCIA
PATCH {{base_url}}/asistencia/1
Authorization: Bearer {{auth_token}}
Content-Type: application/json

{
  "hora_salida": "17:00:00",
  "notas": "Trabajo con hora extra"
}

###

### 6. LISTAR ASISTENCIAS
GET {{base_url}}/asistencia?id_personal=2
Authorization: Bearer {{auth_token}}

###

### 7. CREAR PERMISO
POST {{base_url}}/permisos
Authorization: Bearer {{auth_token}}
Content-Type: application/json

{
  "id_personal": 2,
  "tipo_permiso": "VACACIONES",
  "fecha_inicio": "2024-12-25",
  "fecha_fin": "2024-12-27",
  "motivo": "Vacaciones de Navidad",
  "estado": "PENDIENTE"
}

###

### 8. APROBAR PERMISO
PATCH {{base_url}}/permisos/1/approve
Authorization: Bearer {{auth_token}}
Content-Type: application/json

{
  "estado": "APROBADO",
  "comentarios_aprobacion": "Aprobado por RRHH"
}

###

### 9. LISTAR PERMISOS
GET {{base_url}}/permisos?id_personal=2
Authorization: Bearer {{auth_token}}

###

### 10. CREAR FORMACION
POST {{base_url}}/formacion
Authorization: Bearer {{auth_token}}
Content-Type: application/json

{
  "id_personal": 2,
  "titulo": "Manejo Seguro de Herramientas",
  "descripcion": "Curso de seguridad en jardineria",
  "fecha_inicio": "2024-12-20",
  "fecha_fin": "2024-12-21",
  "duracion_horas": 8,
  "instructor": "Juan Martinez",
  "estado": "PROGRAMADO",
  "tipo_formacion": "SEGURIDAD"
}

###

### 11. ACTUALIZAR FORMACION
PATCH {{base_url}}/formacion/1
Authorization: Bearer {{auth_token}}
Content-Type: application/json

{
  "estado": "COMPLETADO",
  "fecha_completado": "2024-12-21",
  "calificacion": 95,
  "comentarios": "Excelente participacion"
}

###

### 12. LISTAR FORMACIONES
GET {{base_url}}/formacion?id_personal=2
Authorization: Bearer {{auth_token}}
```

### Como usar REST Client
1. Abre el archivo `api-tests.http`
2. Verás un link "Send Request" encima de cada request
3. Haz clic en "Send Request" para ejecutar
4. El resultado aparece en el panel de la derecha

### Actualizar el Token
Después de hacer login (petición 1):
1. Verás la respuesta con el `access_token`
2. Copia el valor del token (sin las comillas)
3. En la parte superior del archivo, reemplaza el valor de `@auth_token`:
   ```
   @auth_token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. Ahora todas las peticiones lo usarán automáticamente

---

## ALTERNATIVA CON THUNDER CLIENT (Sin Environments)

Si prefieres usar Thunder Client, copia y pega manualmente cada petición:

### 1. Login
```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "admin@brightview.com",
  "password": "Admin123!"
}
```

### 2. Initial Onboarding
```
POST http://localhost:3000/personal/init
Content-Type: application/json

{
  "email": "admin@brightview.com",
  "password": "Admin123!",
  "nombre": "Admin",
  "apellido": "System",
  "telefono": "555-0100",
  "fecha_nacimiento": "1980-01-01",
  "direccion": "123 Admin St",
  "puesto": "Administrador",
  "departamento": "Administracion",
  "fecha_contratacion": "2024-01-01",
  "salario": 50000.00,
  "tipo_contrato": "PERMANENTE",
  "horario_trabajo": "LUN-VIE 9:00-17:00",
  "numero_seguro_social": "123-45-6789",
  "contacto_emergencia": "Emergency Contact",
  "telefono_emergencia": "555-0199",
  "rol": "ADMIN"
}
```

### 3. Crear Empleado
```
POST http://localhost:3000/personal/onboarding
Headers:
  Authorization: Bearer [PEGA_EL_TOKEN_AQUI]
  Content-Type: application/json

{
  "email": "juan.perez@brightview.com",
  "password": "Juan123!",
  "nombre": "Juan",
  "apellido": "Perez",
  "telefono": "555-0200",
  "fecha_nacimiento": "1990-05-15",
  "direccion": "456 Employee Ave",
  "puesto": "Jardinero",
  "departamento": "Operaciones",
  "fecha_contratacion": "2024-01-15",
  "salario": 35000.00,
  "tipo_contrato": "PERMANENTE",
  "horario_trabajo": "LUN-VIE 8:00-16:00",
  "numero_seguro_social": "987-65-4321",
  "contacto_emergencia": "Maria Perez",
  "telefono_emergencia": "555-0299",
  "rol": "EMPLEADO"
}
```

(Reemplaza [PEGA_EL_TOKEN_AQUI] con el token que obtuviste del login)

---

## COMANDO PARA ARRANCAR EL BACKEND

Antes de hacer cualquier prueba, asegúrate que el backend esté corriendo.

### En la terminal:
```bash
npm run start:dev
```

El servidor estará listo en: **http://localhost:3000**

Verás un mensaje como:
```
[Nest] 12345  - 05/11/2026, 10:30:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 05/11/2026, 10:30:01 AM     LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345  - 05/11/2026, 10:30:01 AM     LOG [RoutesResolver] AppController {/}:
[Nest] 12345  - 05/11/2026, 10:30:01 AM     LOG [Swagger] Swagger UI available at /api
```

Cuando veas "Swagger UI available at /api", el backend está listo para recibir peticiones.

---

## FLUJO DE PRUEBAS RECOMENDADO

1. Abre una terminal y ejecuta: `npm run start:dev`
2. Espera a que diga que el servidor está listo
3. Instala REST Client en VS Code
4. Crea el archivo `api-tests.http` en la raíz del proyecto
5. Ejecuta las peticiones en orden:
   - Login (copia el token)
   - Actualiza `@auth_token` en el archivo
   - Initial Onboarding
   - El resto de peticiones

---

## CODIGOS DE RESPUESTA ESPERADOS

- **200**: Exito (GET, PATCH)
- **201**: Creado (POST)
- **400**: Datos invalidos
- **401**: No autorizado (token faltante o invalido)
- **403**: Sin permisos (rol insuficiente)
- **404**: Recurso no encontrado
- **409**: Conflicto (datos duplicados)
- **500**: Error interno del servidor