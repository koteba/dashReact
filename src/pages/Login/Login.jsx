

// export default Login;
import { useState } from "react";
import axios from "axios";
import './Login.css';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const send = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("https://vica.website/api/login", {
        email,
        password,
      });
      console.log("Response Data:", data);

      if (data.token) {
        localStorage.setItem("token", `Bearer ${data.token}`);
        localStorage.setItem("user", JSON.stringify(data.user)); // حفظ معلومات المستخدم
        navigate("/dash");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container">
      <h1>Sign In</h1>
      <p>Please enter your email and password to continue</p>
      <form onSubmit={send}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => setemail(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setpassword(event.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
        <div className="sign-up">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
