import "./Suggestion.css";

const Suggestion = ({ Icon, title }) => {
  return (
    <>
      <div className="suggestion-container">
        {<Icon className="suggestion-container-icon" />}
        <p>{title}</p>
      </div>
    </>
  );
};

export default Suggestion;
