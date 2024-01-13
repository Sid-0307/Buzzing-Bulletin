import "./Card.css";

const Card = (props) => {
  return (
    <div
      className="news-items"
      style={{
        backgroundImage: `url(${props.img})`,
        backgroundSize: "cover",
      }}
    >
      <p className="title mt-5">{props.title}</p>
    </div>
  );
};

export default Card;
