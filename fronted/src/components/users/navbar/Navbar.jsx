import { useSelector } from "react-redux";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const userToken = useSelector((store) => store.auth.userToken);
  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <p>
              <span>R</span>eviewer
            </p>
          </div>
          {userToken && (
            <div className="searchbox">
              <input type="text" placeholder="search" />
            </div>
          )}
          <div className="header-buttons">
            <NavLink to="/">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
