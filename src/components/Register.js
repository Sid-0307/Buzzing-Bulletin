import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((result) => {
        if (result.data.status === 200) {
          navigate("/");
        } else if (result.data.status === 400) {
          setError(result.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5 pt-5 vh-100">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border border-2 border-dark">
            <div className="card-body p-5">
              <h2 className="card-title text-center">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mt-2 mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control login-input"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
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
                    className="btn w-100 fs-5 mt-3 btn-success"
                  >
                    Register
                  </button>
                </div>
              </form>
              {error && (
                <div className="error text-center text-danger mt-3">
                  <p>{error}</p>
                </div>
              )}
              <p className="mt-3 text-center">
                Already have an account? <Link to="/">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
