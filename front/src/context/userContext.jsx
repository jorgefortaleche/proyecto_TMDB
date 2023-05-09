import { useState, createContext } from "react";

//Yo lo llamo vamos a crear mi modelo(constructor) en el contexto global de mi api

const initialState = {
  userName: "",
  email: "",
  nationality: "",
  age: "",
  isAuthenticated: false,
  logUser: () => null,
  logOut: () => null,
};

//Exporto y creo mi contexto inicial con mi modelo anterior(initialState)
export const UserContext = createContext(initialState);

//creo mi funcion de context que voy a utilizar en el contexto global y a su vez mi variable de estado(stateLogin) quien va a cambiar por medio del useState.
const AuthContextProvider = ({ children }) => {
  const [stateLogin, setStateLogin] = useState({
    userName: "",
    email: "",
    nationality: "",
    age: "",
    isAuthenticated: false,
  });
  const logUser = (user) => {
    setStateLogin({
      userName: user.userName,
      email: user.email,
      nationality: user.nationality,
      age: user.age,
      isAuthenticated: true,
    });
  };
  const logOut = () => {
    setStateLogin({
      userName: "",
      email: "",
      nationality: "",
      age: "",
      isAuthenticated: false,
    });
  };
  return (
    <AuthContextProvider value={{ ...stateLogin, logOut, logUser }}>
      {children}
    </AuthContextProvider>
  );
};
export default AuthContextProvider;
