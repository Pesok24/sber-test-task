import { memo } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navBar/NavBar";

const Layout = memo(() => {
  return (
    <>
    <NavBar />
    <Outlet />
    </>
  );
});

export default Layout;
