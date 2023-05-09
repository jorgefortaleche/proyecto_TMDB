const { validateToken } = require("../confing/tokens");

//La idea es que con esta ruta me devuelva info personalizada de un usuario logeado, validar si existen

function validateAuth(req, res, next) {
  const token = req.cookies.token; //solicitar token, me va traer un objeto con todas las cookies que tengo guardadas
  if (!token) return sendStatus(401); // si no existe el token 401: no autorizado
  const { user } = validateToken(token); // si hay token validar el token

  if (!user) return sendStatus(401); // si no existe el usuario 401: no autorizado,de todo el contenido del objeto payload solo quiero que me envie la informacion de {user}(email name, lastName), para no enviar informacion sensible como contraseñas o codigos privados, destructuro el payload

  req.user = user;

  next(); //En caso de que si esxita y este todo bien, con esto sigue su proceso normal
}

module.exports = { validateAuth };
