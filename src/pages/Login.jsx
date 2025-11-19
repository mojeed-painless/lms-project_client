import { useState } from "react";
// import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";

const Login = () => {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [message, setMessage] = useState("");
  // const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data } = await api.post("/api/users/login", formData);

      // ✅ Save token in localStorage
      localStorage.setItem("token", data.token);

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded shadow mt-10 bg-white">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {message && <p className="mb-4 text-red-600">{message}</p>}
    <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          value={formData.userName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          autoComplete="current-password"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
        
        <Link to="/register" >Register</Link>
      </form>
    </div>

      
  );
};

export default Login;
