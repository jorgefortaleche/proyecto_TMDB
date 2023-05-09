const Sequelize = require("sequelize");

const db = new Sequelize("tmdbMovie", null, null, {
  //!Porque no puedo cambiar el nombre de Wiki, en este caso un nombre a mi base de datos mas relacionada al proyecto que estoy trabajando.
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
