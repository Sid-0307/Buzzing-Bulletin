import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import "./blog.css";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [content, setContent] = useState("");
  const { name } = useParams();

  useEffect(() => {
    // Fetch blogs from the backend when the component mounts
    axios
      .get("/api/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const handleSubmit = async () => {
    try {
      const date = new Date();
      const response = await axios.post("/api/blogs", { content, name, date });
      window.location.reload(false);
      setBlogs([response.data, ...blogs]);
      console.log(response.data);
      setContent("");
    } catch (error) {
      alert("Error creating blog:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <h2>Create a Blog</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button className="btn btn-warning" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <br></br>
          <div className="col-md-6 ">
            <h2>All Blogs</h2>
            <div className="card-deck all-blogs">
              {blogs.map((blog) => (
                <div key={blog._id} className="card mb-3">
                  <div
                    className="card-body"
                    style={{
                      background: "rgb(221, 245, 221)",
                    }}
                  >
                    <h5 className="card-title mb-3 text-success">
                      {blog.name}
                    </h5>
                    <div className="d-flex justify-content-between">
                      <p className="card-text">{blog.content}</p>
                      <p className="card-text">{blog.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
