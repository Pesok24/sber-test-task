import { memo } from "react";
import { mainPageInfo } from "../../db";

const MainPage = memo(() => {  

  return (
    <>
      <div className="mainPage-wrapper">
        <div className="mainPage-h1-div">Добро пожаловать!</div>
        <div className="mainPage-info-div">{mainPageInfo}</div>
      </div>
    </>
  );
});

export default MainPage;
