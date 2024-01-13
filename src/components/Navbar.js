import React from "react";
import { Link } from "react-router-dom";
import logo from "../Logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar navbar-expand-lg bg-dark p-3 pb-4">
      <div className="container p-0 ms-4">
        <div className="navbar-brand me-5 mt-2" to="/">
          <img
            src={logo}
            height="45"
            width="50"
            className="d-inline-block align-top mt-1"
            alt="logo"
          />
          <span className="ml-2 fs-2 me-5 text-light">Buzzing Bulletin</span>
        </div>

        <div
          className="collapse navbar-collapse d-flex flex-row-reverse navbar-dark  "
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto justify-content-center mt-3  fs-5">
            <li className="nav-item ms-5 me-5">
              <Link className="nav-link" to={"/home"}>
                Home
              </Link>
            </li>
            <li className="nav-item ms-5 me-5">
              <Link className="nav-link" to={`/blogs/${sessionStorage.name}`}>
                Blogs
              </Link>
            </li>
            <li className="nav-item ms-5 me-5">
              <Link className="nav-link" to={`/myblogs/${sessionStorage.name}`}>
                My Blogs
              </Link>
            </li>
            <li className="nav-item ms-5 fs-5 mt-1">
              <button className="btn btn-warning ms-5" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
