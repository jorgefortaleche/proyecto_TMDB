const S = require("sequelize");
const db = require("../db/index");
const bcrypt = require("bcrypt");

class User extends S.Model {
  //Metos de instancia, son los metodos que forman parte de la clase y van a ser utilizados por las instancias que se crean a partir de esa clase
  hash(password, salt) {
    //el password es el que ingresa la persona en texto y el salt es el nuevo caracter, nuevo string que lo genera al azar
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}
//inicializo la tabla de mi modelo, recibe dos parametros uno las caracteristicas en la tabla del modelo(name, lastName,emai, etc...), el segundo paramtetro{} es como es la conexion a esa tabla(A que base de datos me tengo que conectar y a que tabla tengo que apuntar)

User.init(
  {
    userName: { type: S.STRING, allowNull: false },
    email: { type: S.STRING, allowNull: false },
    nationality: { type: S.STRING, allowNull: false },
    age: { type: S.INTEGER, allowNull: false },
    password: { type: S.STRING, allowNull: false },
    salt: { type: S.STRING, defaultValue: "" },
  },
  { sequelize: db, modelName: "user" }
);

User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync(); //genera un string de caracteres randon
  user.salt = salt;
  return user //Aqui un metodo de instancia user.hash
    .hash(user.password, salt) //aqui necesito un return para que sequilize interprete que cuando la promesa se cumpla dentro de la funcion debe retornar la promesa
    .then((hash) => {
      user.password = hash; // el password del usuario lo convierto en el hash que se creo
    });
});

//user en minuscula.algo = son metodos de instancia, hace cambios a las propiedades del modelo, puede acceder a todas sus instancias y metodos del modelo.
//User en Mayuscula.algo = son metodos de clase, operan  en una instancia particular de un modelo

module.exports = User;
