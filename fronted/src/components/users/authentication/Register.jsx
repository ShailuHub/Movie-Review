import { useRef } from "react";
import { Form, FormButton, FormInput } from "../form/Form";
import {
  AuthContainer,
  AuthSpecialLink,
  AuthSpecialLinkContainer,
  AuthTitle,
} from "./Auth";
import { validateEmail, validatePassword } from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFromErrorMessage } from "../../../features/authslice";

const Register = () => {
  const { emailError, passwordError } = useSelector(
    (store) => store.auth.formErrorMessage
  );
  const dispatch = useDispatch();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleOnRegister = (e) => {
    e.preventDefault();
    const userInfo = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    if (!validateEmail(userInfo.email)) {
      emailRef.current.value = "";
      dispatch(addFromErrorMessage({ emailError: "Invalid email" }));
      setTimeout(() => {
        dispatch(addFromErrorMessage({ emailError: null }));
      }, 3000);
      return;
    }
    if (!validatePassword(userInfo.password)) {
      passwordRef.current.value = "";
      dispatch(
        addFromErrorMessage({
          passwordError:
            "Password must has one uppercase, one number, one character and length should be between 6 to 16",
        })
      );
      setTimeout(() => {
        dispatch(addFromErrorMessage({ passwordError: null }));
      }, 3000);
      return;
    }
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AuthContainer>
        <AuthTitle value={"Register"} />
        {emailError && <p className="auth-error">{emailError}</p>}
        {passwordError && <p className="auth-error">{passwordError}</p>}
        <Form>
          <FormInput type="text" placeholder="Name" ref={nameRef} />
          <FormInput type="email" placeholder="Email" ref={emailRef} />
          <FormInput type="password" placeholder="Password" ref={passwordRef} />
          <FormButton value="REGISTER" onClick={handleOnRegister} />
        </Form>
        <AuthSpecialLinkContainer>
          <AuthSpecialLink href={"/login"} value={"Already have an account"} />
          <AuthSpecialLink href={"/login"} value={"Login"} />
        </AuthSpecialLinkContainer>
      </AuthContainer>
    </>
  );
};

export default Register;
