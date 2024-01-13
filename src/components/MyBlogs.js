import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./blog.css";
const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    axios
      .get(`/api/blogs/${name}`)
      .then((response) => {
        setMyBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, [name]);

  return (
    <>
      <Navbar name={name} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h2>My Blogs</h2>
          </div>
        </div>
        <div className="card-deck my-blogs mt-2">
          {myBlogs.map((myBlog) => (
            <div key={myBlog._id} className="card mb-3">
              <div
                className="card-body d-flex justify-content-between "
                style={{
                  background: "rgb(221, 245, 221)",
                }}
              >
                <p className="card-text">{myBlog.content}</p>
                <p className="card-text">{myBlog.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyBlogs;
