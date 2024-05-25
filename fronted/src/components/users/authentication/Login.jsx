import { useRef } from "react";
import { Form, FormInput, FormButton } from "../form/Form";
import {
  AuthContainer,
  AuthSpecialLink,
  AuthSpecialLinkContainer,
  AuthTitle,
} from "./Auth";
import { useDispatch, useSelector } from "react-redux";
import {
  baseUrl,
  validateEmail,
  validatePassword,
} from "../../../utils/constant";
import { addFromErrorMessage, addUserToken } from "../../../features/authslice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { emailError, passwordError } = useSelector(
    (store) => store.auth.formErrorMessage
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleOnLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const userInfo = { email, password };
    if (!validateEmail(userInfo.email)) {
      console.log(userInfo);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      dispatch(
        addFromErrorMessage({ emailError: "Invalid email or password" })
      );
      setTimeout(() => {
        dispatch(addFromErrorMessage({ emailError: null }));
      }, 3000);
      return;
    }
    if (!validatePassword(userInfo.password)) {
      emailRef.current.value = "";
      passwordRef.current.value = "";
      dispatch(
        addFromErrorMessage({
          passwordError: "Invalid email or password",
        })
      );
      setTimeout(() => {
        dispatch(addFromErrorMessage({ passwordError: null }));
      }, 3000);
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const responseJson = await response.json();
      const { token } = responseJson?.message;
      if (!token) {
        navigate("/login");
        return;
      }
      dispatch(addUserToken(token));
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContainer>
      <AuthTitle value={"Login"} />
      {emailError && <p className="auth-error">{emailError}</p>}
      {passwordError && <p className="auth-error">{passwordError}</p>}
      <Form>
        <FormInput type="email" placeholder="Email" ref={emailRef} />
        <FormInput type="password" placeholder="Password" ref={passwordRef} />
        <FormButton value="LOG IN" onClick={handleOnLogin} />
      </Form>
      <AuthSpecialLinkContainer>
        <AuthSpecialLink href={"/forgot-password"} value={"Forgot password"} />
        <AuthSpecialLink href={"/"} value={"Register"} />
      </AuthSpecialLinkContainer>
    </AuthContainer>
  );
};

export default Login;
