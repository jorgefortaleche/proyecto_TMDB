const express = require("express");
const router = express.Router();
const { generateToken, validateToken } = require("../confing/tokens");
const { validateAuth } = require("../middlewares/auth");

const User = require("../models");

/* router.get("/", (req, res) => {
  console.log("llegaste Jorge vamos!!!");
  res.sendStatus(200);
}); */

router.get("/", (req, res) => {
  //metodo de express
  User.findAll().then((user) => {
    //metodo de sequelize
    res.send(user);
  });
});

router.post("/signup", (req, res) => {
  User.create(req.body)
    .then((newUser) => {
      /* console.log("USER", newUser); */
      res.status(201).send(newUser);
    })
    .catch((err) => console.log(err));
});

router.post("/login", (req, res) => {
  //perimero obtengo los datos del usuario por el requets(post)
  const { email, password } = req.body;

  User.findOne({ where: { email } }).then((user) => {
    if (!user)
      return res
        .status(401)
        .send("El usuario no existe debe registrarse(singup)");
    user
      .validatePassword(password) // que pasa si me devuelve false en la validacion es decir el password es incorrecto, paso a la siguiente promesa(okUser).
      .then((okUser) => {
        console.log("OKUSER", okUser);
        if (!okUser) return res.sendStatus(401); // Recibio una solicitud no autenticada o no valida

        const payload = {
          email: user.email,
          userName: user.userName,
        };

        const token = generateToken(payload);

        res.cookie("token", token);
        res.send(payload);
      });
  });
});

router.get("/secret", validateAuth, (req, res) => {
  // si ingresa a el middelware validateAuth y no hay un token o usuario ya se corta el flujo con el return que se asigno a token o user y no entra al correr la callback
  res.send(req.user);
});

router.get("/me", validateAuth, (req, res) => {
  //paso mi middlewares por el parametro de la ruta me, lo que pasa por el metodo get tanto validateAuth como la callBack, express los considerados como middlewares, en una ruta yo puedo pasar los middleWare que crea necesarios.

  res.send(req.user); //si existe un token enviarselo
});

//Ahora hay que hacer el boton del logout
router.post("/logout", (req, res) => {
  //vamos a destruir la cookie que tenemos
  res.clearCookie("token"); //con este metodo vamos a especificar que cookie(token) vamos a borrar, limpiamos la sesion que inicio el usuario

  res.sendStatus(204); //como es una ruta tenemos que reponder algo para que no se quede colgada logeando, 204: es un ok, salio todo bien, se usa mas para tareas de limpiezas(borrar, deslogeo).
});

module.exports = router;
