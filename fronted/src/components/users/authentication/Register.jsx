import { useRef } from "react";
import { Form, FormButton, FormInput } from "../form/Form";
import {
  AuthContainer,
  AuthSpecialLink,
  AuthSpecialLinkContainer,
  AuthTitle,
} from "./Auth";

const Register = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleOnRegister = () => {
    const userInfo = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
  };

  return (
    <>
      <AuthContainer>
        <AuthTitle value={"Register"} />
        <Form>
          <FormInput text="text" placeholder="Name" ref={nameRef} />
          <FormInput text="email" placeholder="Email" ref={emailRef} />
          <FormInput text="password" placeholder="Password" ref={passwordRef} />
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
