const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const models = require("./models/index");
const db = require("./db");
const routes = require("./routes");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", routes);

/* app.use("/api", (req, res) => {
  res.sendStatus(404); //error no found, la pagina no pudo ser encontrada
}); */

app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message); //Error 500 indica que se produjo un problema en el servidor que hospeda el sitio web
});

db.sync({ force: false }) //Sincroniza el servidor con la base de datos,
  .then(() => {
    // Recién ahora estamos seguros que la conexión fue exitosa
    app.listen(5000, () =>
      console.log("Servidor escuchando en el puerto 5000")
    );
  })
  .catch(console.error);
