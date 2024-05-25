import { useLocation } from "react-router-dom";
import { Form, FormButton, FormInput } from "../form/Form";
import {
  AuthFeatureContainer,
  AuthFeatureTitle,
  AuthFeatureButton,
} from "./Auth";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl, validatePassword } from "../../../utils/constant";
import { useRef } from "react";
import { addFromErrorMessage } from "../../../features/authslice";

const ResetPassword = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const { passwordError } = useSelector((store) => store.auth.formErrorMessage);
  const passwordRef = useRef();
  const newPasswordRef = useRef();
  const handleOnConfirm = async () => {
    const password = passwordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    if (!validatePassword(password)) {
      passwordRef.current.value = "";
      newPasswordRef.current.value = "";
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
    if (password != newPassword) {
      passwordRef.current.value = "";
      newPasswordRef.current.value = "";
      dispatch(
        addFromErrorMessage({
          passwordError: "Password doesn't match",
        })
      );
      setTimeout(() => {
        dispatch(addFromErrorMessage({ passwordError: null }));
      }, 3000);
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/api/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password, newPassword }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="main-container">
      <AuthFeatureContainer>
        <AuthFeatureTitle value={"Enter new password"} />
        {passwordError && <p className="auth-error">{passwordError}</p>}
        <Form>
          <FormInput text="password" placeholder="Password" ref={passwordRef} />
          <FormInput
            text="password"
            placeholder="New password"
            ref={newPasswordRef}
          />
        </Form>
        <AuthFeatureButton
          value={"Confirm password"}
          onClick={handleOnConfirm}
        />
      </AuthFeatureContainer>
    </main>
  );
};

export default ResetPassword;
