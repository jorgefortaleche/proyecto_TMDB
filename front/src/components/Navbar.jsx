import { Link } from "react-router-dom";
import { UserContext } from "../context/AuthContextProvider";
import { useContext } from "react";

const Navbar = () => {
  const user = useContext(UserContext);
  return user.isAuthenticated ? (
    <div>
      <h3>{user.userName}</h3>
      <button onClick={user.logOut}>LogOut</button>
    </div>
  ) : (
    <div className="navbar-item navbar-end">
      <Link to={"/users/signup"}>
        <button>Signup</button>
      </Link>
      <Link to={"/users/login"}>
        <button>Login</button>
      </Link>
    </div>
  );
};

export default Navbar;
