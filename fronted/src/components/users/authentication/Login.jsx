import { Form, FormInput, FormButton } from "../form/Form";
import {
  AuthContainer,
  AuthSpecialLink,
  AuthSpecialLinkContainer,
  AuthTitle,
} from "./Auth";

const Login = () => {
  return (
    <AuthContainer>
      <AuthTitle value={"Login"} />
      <Form>
        <FormInput type="email" placeholder="Email" />
        <FormInput text="password" placeholder="Password" />
        <FormButton value="LOG IN" />
      </Form>
      <AuthSpecialLinkContainer>
        <AuthSpecialLink href={"/forgot-password"} value={"Forgot password"} />
        <AuthSpecialLink href={"/"} value={"Register"} />
      </AuthSpecialLinkContainer>
    </AuthContainer>
  );
};

export default Login;
