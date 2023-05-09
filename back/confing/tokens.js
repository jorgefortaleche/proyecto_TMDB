const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "logan";

const generateToken = (payload) => {
  // recibo un payload por parametro para poder generar un token a cualquier tipo de usuaario
  const token = jwt.sign({ user: payload }, TOKEN_SECRET, { expiresIn: "2d" }); // el payload es lo que queremos guardar
  return token;
};

const validateToken = (token) => {
  return jwt.verify(token, TOKEN_SECRET); //El metodo verify me va recibir un token y un salt(secret) se va asegurar de que sea el correcto y si esta bien te devuelve el payload
};

module.exports = { generateToken, validateToken };
