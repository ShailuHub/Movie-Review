import { useRef } from "react";
import { Form, FormInput } from "../form/Form";
import {
  AuthFeatureButton,
  AuthFeatureContainer,
  AuthFeatureTitle,
} from "./Auth";
import { baseUrl } from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addResponseMessage } from "../../../features/authslice";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const dispatch = useDispatch();
  const responseMessage = useSelector((state) => state.auth.responseMessage);
  const handleOnSendLink = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    try {
      const response = await fetch(`${baseUrl}/api/user/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const responseJson = await response.json();
      if (response.status === 201) {
        dispatch(addResponseMessage({ message: responseJson.message }));
        setTimeout(() => {
          dispatch(addResponseMessage({ message: null }));
          navigate("/login");
        }, 3000);

        return;
      }
    } catch (error) {
      console.log(error);
      dispatch(addResponseMessage({ error }));
      setTimeout(() => {
        dispatch(addResponseMessage({ error: null }));
      }, 3000);
    }
  };
  return (
    <main className="main-container">
      <AuthFeatureContainer>
        <AuthFeatureTitle value={"Please enter your registered email"} />
        {responseMessage.error && (
          <p className="auth-error">{responseMessage.error}</p>
        )}
        {responseMessage.message && (
          <p className="auth-error">{responseMessage.message}</p>
        )}
        <Form>
          <FormInput type="email" placeholder="ex@gmail.com" ref={emailRef} />
        </Form>
        <AuthFeatureButton value={"Send Link"} onClick={handleOnSendLink} />
      </AuthFeatureContainer>
    </main>
  );
};

export default ForgotPassword;
