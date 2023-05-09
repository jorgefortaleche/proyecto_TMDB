import React, { useContext } from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
import { UserContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const email = useInput();
  const password = useInput();
  const user = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuario = {
      email: email.value,
      password: password.value,
    };
    axios
      .post("http://localhost:3000/api/users/login", usuario)
      .then((result) => result.data)
      .then((result) => {
        user.logUser(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="text-center mt-5 mb-5">LOGIN</h1>
      <form className="container mb-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="email" {...email} />
        <input
          type="password"
          name=""
          id=""
          placeholder="password"
          {...password}
        />
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
