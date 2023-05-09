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
      <form>
        <input type="text" placeholder="searh" />
        <button class="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Navbar;
