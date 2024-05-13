import "./Auth.css";
import { Link } from "react-router-dom";

const AuthSpecialLink = ({ href, value }) => {
  return (
    <Link to={href} className="auth-special-link">
      {value}
    </Link>
  );
};

const AuthTitle = ({ value }) => {
  return <p className="auth-title">{value}</p>;
};

const AuthContainer = (props) => {
  return <div className="auth-container">{props.children}</div>;
};

const AuthSpecialLinkContainer = (props) => {
  return <div className="auth-special-link-container">{props.children}</div>;
};

const AuthFeatureContainer = (props) => {
  return <div className="auth-feature-container">{props.children}</div>;
};

const AuthFeatureTitle = ({ value }) => {
  return <p className="auth-featur-heading-title">{value}</p>;
};

const AuthFeatureButton = ({ value }) => {
  return <button className="auth-feature-button">{value}</button>;
};

export {
  AuthSpecialLink,
  AuthTitle,
  AuthContainer,
  AuthSpecialLinkContainer,
  AuthFeatureContainer,
  AuthFeatureTitle,
  AuthFeatureButton,
};
