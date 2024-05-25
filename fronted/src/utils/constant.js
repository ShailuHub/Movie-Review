import { VscFeedback } from "react-icons/vsc";
import { Md18UpRating } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";

const icons = [
  { Icon: VscFeedback, title: "Feedback" },
  { Icon: Md18UpRating, title: "Rate" },
  { Icon: FaFileUpload, title: "Upload" },
];

const baseUrl = "http://localhost:3000";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password) => {
  return String(password).match(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  );
};

export { icons, baseUrl, validateEmail, validatePassword };
