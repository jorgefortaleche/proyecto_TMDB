import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-item navbar-end">
      <Link to={"/users/signup"}>
        <button>Singup</button>
      </Link>
      <Link to={"/users/login"}>
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Navbar;
