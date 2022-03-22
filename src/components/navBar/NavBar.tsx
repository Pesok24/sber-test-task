import React, { memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../customHooks/useUser";
import EnterBtn from "./EnterBtn";
import ExitBtn from "./ExitBtn";

const NavBar = memo(() => {
  const { status } = useUser();
  let navigate = useNavigate();

  const btnsCofig = {
    login: <EnterBtn />,
    logout: <ExitBtn />,
  };

  const currentButton = status ? btnsCofig.logout : btnsCofig.login;

  const handleClick = useCallback(
    (ev: React.MouseEvent) => {
      !status && navigate("/login");
      status && navigate("/dir");
    },
    [navigate, status]
  );

  return (
    <>
      <div className="navbar-wrapper">
        <div className="navbar-logo">Словарь</div>
        <div className="navbar-links">
          <Link to="/">
            <div className="navbar-link">Главная</div>
          </Link>
          <div className="navbar-link" onClick={handleClick}>Справочник</div>
          <Link to="/about">
            <div className="navbar-link">О нас</div>
          </Link>
          {currentButton}
        </div>
      </div>
    </>
  );
});

export default NavBar;
