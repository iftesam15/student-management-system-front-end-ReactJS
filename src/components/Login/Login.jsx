import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      setError(null); // Clear any previous errors

      // Store token in localStorage
      if (response.status === 200) {
        storeTokenInLS(response.data.token);
        navigate("/"); // Redirect to protected route
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="mb-4 text-center">Express js demo app</h1>
      <div className="login-container">
        <div>
          <h2>Login</h2>
          <form className="student-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          {error && <p className="error">{error}</p>}
          <p className="text-center">
            <Link to="/forget-password">Forgot your password?</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
