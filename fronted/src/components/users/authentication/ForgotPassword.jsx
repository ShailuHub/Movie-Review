import { Form, FormInput } from "../form/Form";
import {
  AuthFeatureButton,
  AuthFeatureContainer,
  AuthFeatureTitle,
} from "./Auth";

const ForgotPassword = () => {
  return (
    <main className="main-container">
      <AuthFeatureContainer>
        <AuthFeatureTitle value={"Please enter your registered email"} />
        <Form>
          <FormInput type="email" placeholder="ex@gmail.com" />
        </Form>
        <AuthFeatureButton value={"Send Link"} />
      </AuthFeatureContainer>
    </main>
  );
};

export default ForgotPassword;
