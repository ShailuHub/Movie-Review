import { forwardRef } from "react";
import "./Form.css";

const Form = (props) => {
  return (
    <form action="" className="form">
      {props.children}
    </form>
  );
};

const FormButton = ({ value, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {value}
    </button>
  );
};

const FormInput = forwardRef(({ type, placeholder }, ref) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="form-input"
      ref={ref}
    />
  );
});

export { Form, FormButton, FormInput };
