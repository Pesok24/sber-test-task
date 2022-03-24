import React, { memo, useCallback, useState } from "react";
import { useUser } from "../../customHooks/useUser";

const Login = memo(() => {
  const [formState, setFormState] = useState({
    loginInput: "",
    passwordInput: "",
  });

  const [passError, setPassError] = useState(false);

  const { checkUser } = useUser();

  const handleSubmit = useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault();
      const { status, name } = checkUser(formState);
      if (status) {
        localStorage.setItem("user", name);
        localStorage.setItem("status", status.toString());
        return;
      }
      setPassError(true);
    },
    [checkUser, formState]
  );

  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = ev.target;
      setFormState((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  return (
    <>
      <div className="login-wrapper">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-head">Вход</h1>
          <div className="login-el">
            <p className="login-p">Имя пользователя:</p>
            <input
              type="text"
              className="login-input"
              name="loginInput"
              onChange={handleChange}
            />
          </div>
          <div className="login-el">
            <p className="login-p">Пароль:</p>
            <input
              type="password"
              className="login-input"
              name="passwordInput"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="login-button">
            Войти
          </button>
          {passError ? (
            <p className="login-error">
              Имя пользователя или пароль введены не верно
            </p>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
});

export default Login;
