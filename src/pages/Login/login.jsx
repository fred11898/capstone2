import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setIsAuthenticate } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "http://127.0.0.1:5000/api/login";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    try {
      const response = await fetch(url, requestOptions);
      if (response.status === 200) {
        let loginData = await response.json();
        setToken(loginData.token);
        setIsAuthenticate(true);
        navigate("/home");
      } else {
        alert("Invalid Credential");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="mt-5">
        <div className="row">
          <div className="col-lg-8">
            <img src="img/logo.png" alt="Logo" height={350} width={400} />
          </div>
          <div className="col-lg-4 login">
            <form onSubmit={handleSubmit}>
              <p>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="form-control form-control-lg"
                  required="required"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </p>
              <p>
                <input
                  type="password"
                  name="password"
                  required="required"
                  placeholder="Password"
                  className="form-control form-control-lg"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </p>
              <div className="d-grid">
                <button className="btn btn-outline-primary btn-lg" type="submit" value="Login">Login</button>
              </div>
              <div className="mt-3 text-align-center">
              <Link>Forgot Password?</Link>
              <hr />
              <Link to="/create/account"><button className="btn btn-success btn-lg">Sign Up</button></Link>
              </div>
            </form>
          </div>
        </div>
      </div>      
    </div>
  );
};

export default Login;
