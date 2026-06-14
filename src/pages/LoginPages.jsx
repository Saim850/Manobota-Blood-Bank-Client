import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api'
import { Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate()
  const [loding, setLoding] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true)
    try {
      const response = await api.post("/auth/jwt/create", formData);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      navigate("/ ")
      alert("Login Successful!");

    } catch (error) {
      console.log(error.response?.data);
      alert("Invalid email or password");
    }finally{
      setLoding(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r bg-red-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 mx-5">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-0"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-0"
            />
          </div>

          {loding ? (
            <p className="text-center my-4">
              <span className="loading loading-xl loading-spinner text-error"></span>
            </p>
          ):(
            <button
              type="submit"
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-300"
            >
              Login
            </button>
          )}
        </form>

        {/* <p className="text-center my-3 p-2 rounded-md hover:bg-gray-200 transition duration-100">
          <Link to='/forgot-password' className="font-bold text-red-500">Forgotten Password?</Link>
        </p> */}

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-red-500 font-semibold hover:underline"
          >
            register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;