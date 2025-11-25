# Documentación de la API

## Descripción General

Este documento describe los endpoints REST disponibles en la API. Todas las rutas están gestionadas mediante un router de Express.

---

## URL Base

1. despliegue local : http://localhost:3000/api/
1. despliegue en linea : aun no definido
   /

````

---

## Endpoints Públicos

### **GET

Devuelve un mensaje simple para verificar que la API está funcionando.


**Respuesta:**



Hello World!

```
---

### **POST /authenticate**

Autentica a un usuario.

**Middleware:** `authRequest`

**Controlador:** `authenticateUser`

**Ejemplo de cuerpo:**

```json
{
  "username": "exampleuser",
  "password": "123456"
}
````

**Notas:**

- Retorna un token JWT si las credenciales son correctas.

---

### **POST /user/create**

Crea un nuevo usuario.

**Middleware:** `userCreateRequest`

**Controlador:** `storeUser`

**Ejemplo de cuerpo:**

```json
{
  "fullname": "Martin",
  "email": "Martin@example.com",
  "password": "contraseña123",
  "username": "exampleUsername",
  "cellphone": "76345655"
}
```

---

## Endpoints Protegidos

Todas las rutas a continuación requieren autenticación mediante un token JWT válido.

Debes enviar el token en el header:

```
Authorization: Bearer <token>
```

---

### **GET /prueba**

Endpoint de prueba para verificar si el token enviado es válido.

**Respuesta:**

```
tiene el token!
```

---

### **POST /sensor/create**

Crea un dispositivo o módulo electrónico y asocia los sensores que tendrá.

**Middleware:** `deviceStoreRequest`

**Controlador:** `storeDevice`

**Ejemplo de cuerpo:**

```json
{
  "device_name": "Modulo1_region1",
  "device_uuid": "8f4c2e56-9b3a-4f7a-8c2c-1b9f4c72d8ab",
  "device_section": "Seccion b3, numero 56",
  "device_sensors": [
    {
      "name": "Temperatura",
      "code": "TMP",
      "minvalue": "10",
      "maxvalue": "20",
      "type":"temperature","humidity","pressure","light","motion","custom",
      "description": "Sensor temperatura modelo DS18B20 para lombricultara interna"
    }
  ],
  "userId": "1"
}
```

**Notas:**

- El `uuid` debe coincidir con el identificador del dispositivo físico.
- Los sensores registrados aquí determinan qué datos serán almacenados.
- Si un tipo de sensor no está registrado, sus datos **no serán guardados**.

---

## Información del Proyecto (package.json)

Resumen de dependencias y scripts usados por la API.

### Dependencias Principales

- Express 5
- Autenticación JWT
- Sequelize + MySQL2
- MQTT
- Validación con express-validator

### Scripts Disponibles

```
pnpm run dev
```

Ejecuta el servidor con nodemon para recarga automática.

---

## Notas para Postman

Para enviar peticiones POST, asegúrate de incluir:

```
Headers:
Content-Type: application/json
```

---
