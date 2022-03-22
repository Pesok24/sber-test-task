import React, { memo, useCallback, useState } from "react";

const rightPass = { login: "admin", password: "12345" };

const Login = memo(() => {
  const [formState, setFormState] = useState({
    loginInput: "",
    passwordInput: "",
  });

  const handleSubmit = useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault();
      const { login, password } = rightPass;
      const { loginInput, passwordInput } = formState;
      if (login === loginInput && password === passwordInput) {
        
      }
    },
    [formState]
  );

  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = ev.target;
      setFormState((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  console.log(formState);
  return (
    <>
      <div className="login-wrapper">
        <form onSubmit={handleSubmit}>
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
        </form>
      </div>
    </>
  );
});

export default Login;
