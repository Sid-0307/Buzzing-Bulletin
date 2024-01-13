import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", {
        email: email,
        password: password,
      })
      .then((result) => {
        if (result.data.check === "Authenticated") {
          sessionStorage.setItem("name", result.data.name);
          sessionStorage.setItem("email", result.data.email);
          navigate("/home");
        } else {
          setError(result.data.check);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container pt-5 vh-100">
      <div className="mt-5 pt-5 row justify-content-center">
        <div className="col-md-6">
          <div className="card border border-2 border-dark">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-3">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control login-input"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control login-input"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success w-100 fs-5 mt-3 mb-3"
                  >
                    Login
                  </button>
                </div>
              </form>
              {error && (
                <div className="error text-center text-danger">
                  <p>{error}</p>
                </div>
              )}
              <p className="mt-3 text-center">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
