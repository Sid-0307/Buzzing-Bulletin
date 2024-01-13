import react from "react";
import { ReactDOM } from "react";
import Card from "./Card";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import "./Card.css";

const Home = () => {
  const [backend, setBackend] = useState([{}]);
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.name) {
      fetch("http://localhost:5000/api")
        .then((res) => res.json())
        .then((data) => {
          setBackend(data["results"]);
          // console.log(data);
        });
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="vh-100 ">
      <Navbar />

      <div className="content">
        {backend.map(
          (b) =>
            b.image_url && (
              <Card
                title={b.title}
                img={b.image_url}
                creator={b.creator}
                content={b.content}
                data={b.pubDate}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Home;
