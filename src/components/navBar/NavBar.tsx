import { memo } from "react";
import { Link } from "react-router-dom";

const NavBar = memo(() => {
  return (
    <>
      <div className="navbar-wrapper">
        <div className="navbar-logo">Словарь</div>
        <div className="navbar-links">
          <Link to="/">
            <div className="navbar-link">Главная</div>
          </Link>
          <Link to="/dir">
            <div className="navbar-link">Справочник</div>
          </Link>
          <Link to="/about">
            <div className="navbar-link">О нас</div>
          </Link>
          <Link to="/login">
            <div className="navbar-link">Вход</div>
          </Link>
        </div>
      </div>
    </>
  );
});

export default NavBar;
