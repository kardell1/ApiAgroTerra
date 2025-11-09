## Documentacion de rutas

### Modulo Login

#### Descripcion

Este endpoint permite autenticar usuarios mediante nombre de usuario y contraseña.
Verifica las credenciales contra la base de datos y si son correctas, genera un token (passport) para el acceso a las rutas protegidas.

#### Rutas de proyecto

| Metodo | Ruta              | Cuerpo de solicitud                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Validacion                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------ | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Post   | api/authenticate  | El cuerpo está compuesto por: {username: string, password: string}                                                                                                                                                                                                                                                                                                                                                                                                                                   | username: debe tener mínimo 5 caracteres y máximo 15, no puede ser nulo, solo se permiten letras, números y los caracteres `_.-`. password: debe estar encriptada con bcrypt.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Post   | api/user/create   | El cuerpo está compuesto por: "fullname", "username", "password", "cellphone", "email"                                                                                                                                                                                                                                                                                                                                                                                                               | cellphone: solo números válidos, email: formato de correo válido, username y password: no permiten caracteres especiales, fullname: solo texto y espacios.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Post   | api/sensor/create | El cuerpo está compuesto por un objeto con las siguientes propiedades: <br> **device_name**: nombre del módulo, <br> **device_uuid**: identificador único (UUID v4), <br> **device_section**: área donde está ubicado el dispositivo, <br> **device_sensors**: arreglo de sensores con las siguientes propiedades: <br> - sensor_name (string) <br> - sensor_code (string) <br> - sensor_min (float) <br> - sensor_max (float) <br> - sensor_type (enum) <br> - sensor_description (string opcional) | Validación: <br> **device_name**: requerido, entre 3 y 50 caracteres, solo letras, números y símbolos `._-`. <br> **device_uuid**: requerido, debe ser un UUID v4 válido. <br> **device_section**: requerido, entre 3 y 30 caracteres, solo letras, números y símbolos `._-`. <br> **device_sensors**: debe ser un arreglo con al menos un sensor. <br> **sensor_name**: requerido, 3–50 caracteres válidos. <br> **sensor_code**: requerido, texto. <br> **sensor_min / sensor_max**: numéricos, con `sensor_max` > `sensor_min`. <br> **sensor_type**: uno de ["temperature", "humidity", "pressure", "light", "motion", "custom"]. <br> **sensor_description**: opcional, máximo 200 caracteres. |

#### Conexion a hiveMq

b2253d55de2740b68ac4991e75c5f2f5.s1.eu.hivemq.cloud

#### creando conexion

username : hivemq.webclient.1760647679265
password : dhRnEef,83%:lN64@XCL

#### Datos de cada topico

Sugerencias :

1. recuperar datos como estado de conectividad
1. salud del hardware (como esta trabajando , si esta muy caliente)
1. nombre de cada modulo (uuid)
1. nombr del sensor + unidad medida
   const miString = "t=24.7,h=34.6,s=light:32"
   clave=valor

1. el error que pueda existir al recuperar los datos , deben ser manejados dentro del modulo electronico , de esa manera asegurar la respuesta de datos al api, en caso de que el sensor deje de existir seria mejor enviar null
