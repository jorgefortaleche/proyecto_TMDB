import axios from "axios";
import useInput from "../hooks/useInput";

import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();
  const userName = useInput();
  const email = useInput();
  const nationality = useInput();
  const age = useInput();
  const password = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      userName: userName.value,
      age: age.value,
      nationality: nationality.value,
      email: email.value,
      password: password.value,
    };
    axios
      .post("http://localhost:3000/api/users/signup", newUser)
      .then((result) => console.log(result))
      .then(navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className="text-center mt-5 mb-5">SIGNUP</h1>
      <form className="container mb-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="userName" {...userName} />
        <input type="text" placeholder="age" {...age} />
        <input type="text" placeholder="nationality" {...nationality} />
        <input type="text" placeholder="email" {...email} />
        <input type="password" placeholder="password" {...password} />
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
