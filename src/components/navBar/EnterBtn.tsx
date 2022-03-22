import { memo } from "react";
import { Link } from "react-router-dom";

const EnterBtn = memo(() => {
  return (
    <Link to="/login">
      <div className="navbar-link">Вход</div>
    </Link>
  );
});

export default EnterBtn;
