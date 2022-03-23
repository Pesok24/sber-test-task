import { memo, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "../../customHooks/useUser";
import NavBar from "../navBar/NavBar";
import "../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf";

const Layout = memo(() => {
  const { setUserStorage } = useUser();

  useEffect(() => {
    setUserStorage();
    console.log("effect");
  }, [setUserStorage]);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
});

export default Layout;
