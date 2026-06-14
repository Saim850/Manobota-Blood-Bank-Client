import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function Register() {
  const[isLoding, setLoding] = useState(false)

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name:"",
    email: "",
    phone_number:"",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setLoding(true)
    if (formData.password !== formData.password2) {
      setError("Passwords do not match");
      return;
    }
    
    try {
      await api.post(
        "/register/",
        formData
      );

      navigate("/login");
    } catch (err) {
      console.log(err.response?.data)
      setError(
        err.response?.data?.message ||
          "Registration failed"
      );
    }
    finally{
      setLoding(false)
    }
  };

  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center text-red-600 mb-2">
          User Registration
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Join our community and help save lives.
        </p>


        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 w-full"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 w-full"
          />

          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 w-full"
          />


          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 w-full"
          />

          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 w-full"
          />


          {isLoding ? (
            <p className="text-center my-4">
              <span className="loading loading-xl loading-spinner text-error"></span>
            </p>
          ):(
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
            >
              Register
            </button>
          )}
        </form>

        <p className="text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-600 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}