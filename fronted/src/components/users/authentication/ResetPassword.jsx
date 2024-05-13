import { Form, FormButton, FormInput } from "../form/Form";
import {
  AuthFeatureContainer,
  AuthFeatureTitle,
  AuthFeatureButton,
} from "./Auth";

const ResetPassword = () => {
  return (
    <main className="main-container">
      <AuthFeatureContainer>
        <AuthFeatureTitle value={"Enter new password"} />
        <Form>
          <FormInput text="password" placeholder="Password" />
          <FormInput text="password" placeholder="New password" />
        </Form>
        <AuthFeatureButton value={"Confirm password"} />
      </AuthFeatureContainer>
    </main>
  );
};

export default ResetPassword;
