import { memo } from "react";
import { aboutInfo } from "../../db";

const About = memo(() => {

  return (
    <>
      <div className="about-wrapper">
        <div className="about-h1-div">О нас:</div>
        <div className="about-info-div">{aboutInfo}</div>
      </div>
    </>
  );
});

export default About;
