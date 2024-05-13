import { useEffect, useRef, useState } from "react";
import "./OtpVerification.css";
import {
  AuthFeatureButton,
  AuthFeatureContainer,
  AuthFeatureTitle,
} from "./Auth";

const otp_length = 6;

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(otp_length).fill(""));
  const [otpIndex, setOtpIndex] = useState(0);
  const inputRef = useRef();

  const focusPreviousInput = (idx) => {
    let diff = idx === 0 ? 0 : idx - 1;
    setOtpIndex(diff);
  };

  const focusNextInput = (idx) => {
    if (otpIndex < otp_length - 1) {
      setOtpIndex(idx + 1);
    }
  };

  const handleOnChange = (event, idx) => {
    const { target } = event;
    const newOtp = [...otp];
    newOtp[idx] = target.value.substring(
      target.value.length - 1,
      target.value.length
    );
    if (!target.value) {
      focusPreviousInput(idx);
    } else {
      focusNextInput(idx);
    }
    setOtp(newOtp);
  };

  const handleOnKeyDown = (event, idx) => {
    if (event.key === "Backspace") {
      event.preventDefault();
      const newOtp = [...otp];
      newOtp[idx] = "";
      setOtp(newOtp);
      focusPreviousInput(idx);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [otpIndex]);

  return (
    <>
      <main className="main-container">
        <AuthFeatureContainer>
          <AuthFeatureTitle
            value={" Please enter the OTP to verify your account"}
          />
          <p className="heading-subtitle">
            <span>OTP has sent to your email</span> ex***@gmail.com
          </p>
          <div className="otp-container">
            {otp.map((digit, idx) => {
              return (
                <input
                  ref={otpIndex === idx ? inputRef : null}
                  type="number"
                  key={idx}
                  onChange={(event) => handleOnChange(event, idx)}
                  value={otp[idx] || ""}
                  onKeyDown={(event) => handleOnKeyDown(event, idx)}
                />
              );
            })}
          </div>
          <AuthFeatureButton value={"Verify account"} />
        </AuthFeatureContainer>
      </main>
    </>
  );
};

export default OtpVerification;
