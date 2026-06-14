import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      await axios.post("https://blood-donations-api-1.onrender.com/api/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: password,
      });

      setMessage("Password reset successful");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log(error)
      setMessage(error.response?.data.new_password[0]);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-linear-to-r bg-red-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-red-500">
          Reset Passowrd
        </h1>
        <h2 className="text-gray-400 text-center">The password must contain 4 letters and 4 numbers.</h2>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-0"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            value={password2}
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-0"
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-300"
          >
            Change Password
          </button>
        </form>
        {message}
      </div>
    </div>
  );
}