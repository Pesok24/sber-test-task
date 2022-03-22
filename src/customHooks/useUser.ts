import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { FormState } from "../@types/common";
import { useAppSelector } from "../app/hooks";
import { logoutUser, selectUser, setUser } from "../features/user/userSlice";

export const useUser = () => {
  const { name, status } = useAppSelector(selectUser);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const checkUser = useCallback(
    (formState: FormState) => {
      const rightPass = { login: "admin", password: "12345" };
      const { login, password } = rightPass;
      const { loginInput, passwordInput } = formState;
      if (login === loginInput && password === passwordInput) {
        dispatch(setUser(login));
        navigate("/");
        return { name: login, status: true };
      }
      return { name: "", status: false };
    },
    [dispatch, navigate]
  );

  const setUserStorage = useCallback(() => {
    const user = localStorage.getItem("user");
    user && dispatch(setUser(user));
  }, [dispatch]);

  const logOut = useCallback(() => {
    localStorage.clear()
    dispatch(logoutUser());
    navigate("/")
  }, [dispatch, navigate]);

  return useMemo(
    () => ({
      name,
      status,
      checkUser,
      setUserStorage,
      logOut,
    }),
    [checkUser, logOut, name, setUserStorage, status]
  );
};
