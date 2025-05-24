import { useCallback, useState, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { fetchRegisterUser } from "../../store/slices/services/fetchRegisterUser";
import CustomButton from "../UI/CustomButton";
import { fetchLoginUser } from "../../store/slices/services/fetchLoginUser";

function AuthForm() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isRegister = useAppSelector((state) => state.auth.isRegister);
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onHandleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onHandleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(registerForm);
      dispatch(fetchRegisterUser(registerForm));
    }

  const handleLogin = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(registerForm);
    dispatch(fetchLoginUser(loginForm));
  }

  console.log(isAuth);
  return (
    <div>
      {/* только в рамках нашего проекта это актуально, в реальном надо будет делить форму на регистрацию и логин отдельно */}

      <div>
        <h3>Register</h3>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            onChange={onHandleRegisterChange}
            name="name"
            value={registerForm.name}
          />
          <input
            type="text"
            onChange={onHandleRegisterChange}
            name="email"
            value={registerForm.email}
          />
          <input
            type="text"
            onChange={onHandleRegisterChange}
            name="password"
            value={registerForm.password}
          />
          <CustomButton btnText="sign up" />
        </form>
      </div>

      <div>
        <h3>log in</h3>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            onChange={onHandleLoginChange}
            name="email"
            value={loginForm.email}
          />
          <input
            type="text"
            onChange={onHandleLoginChange}
            name="password"
            value={loginForm.password}
          />
          <CustomButton btnText="log in" />
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
