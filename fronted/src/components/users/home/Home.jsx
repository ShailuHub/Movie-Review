import Register from "../authentication/Register";
import "./Home.css";
import Suggestion from "./Suggestion";
import { icons } from "../../../utils/constant";
import Login from "../authentication/Login";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  return (
    <>
      <main className="main-container">
        <section className="left-section">
          <h1>
            Welcome to our <span>Movie Reviewer</span>
          </h1>
          <p>
            <span>Discover</span> new films, share your thoughts, and connect
            with fellow movie lovers. Your opinions matter here, whether you're
            a casual viewer or a film buff. Join us and let's explore the world
            of cinema together!
          </p>
          <div className="features">
            {icons.map((item, idx) => {
              return (
                <Suggestion key={idx} Icon={item.Icon} title={item.title} />
              );
            })}
          </div>
        </section>
        <section className="right-section">
          {location.pathname === "/login" && <Login />}
          {location.pathname === "/" && <Register />}
        </section>
      </main>
    </>
  );
};

export default Home;
