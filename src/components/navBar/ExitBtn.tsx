import React, { memo, useCallback } from "react";
import { useUser } from "../../customHooks/useUser";

const ExitBtn = memo(() => {
  const { logOut } = useUser();

  const handleClick = useCallback(
    (ev: React.MouseEvent) => {
      logOut();
    },
    [logOut]
  );

  return (
    <div className="navbar-link" onClick={handleClick}>
      Выход
    </div>
  );
});

export default ExitBtn;
