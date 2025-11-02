## Documentacion de rutas

### Modulo Login

#### Descripcion

Este endpoint permite autenticar usuarios mediante nombre de usuario y contraseña.
Verifica las credenciales contra la base de datos y si son correctas, genera un token (passport) para el acceso a las rutas protegidas.

#### Rutas de proyecto

| Metodo-------------- | Ruta -------------------------- | Cuerpo de solicitud                                                   | Validacion                                                                                                                                                                       |
| -------------------- | ------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Post                 | api/authenticate                | El cuerpo esta compuesto por :{username : string , password : string} | username : debe tener minimo 5 digitos y como maximo 15, No debe ser nulo , Solo se permiten caracteres letras , numeros , '\_.-' , password : Debe estar encripatada con bcrypt |

#### Conexion a hiveMq

b2253d55de2740b68ac4991e75c5f2f5.s1.eu.hivemq.cloud

#### creando conexion

username : hivemq.webclient.1760647679265
password : dhRnEef,83%:lN64@XCL
