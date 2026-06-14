import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoding , setLoding] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true)
    try {
      await axios.post("https://blood-donations-api-1.onrender.com/api/auth/users/reset_password/", {
        email,
      })

      setMessage("Password reset email sent. Check your email.");
    } catch (error) {
      console.error(error.response?.data);
      setMessage("Something went wrong.");
    } finally{
      setLoding(false)
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-linear-to-r bg-red-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
         <h1 className="text-3xl font-bold text-center text-gray-800">
            Forgot Your Password
         </h1>

         <p className="text-center text-gray-500 mt-2">
            Enter you email for forgot password
         </p>

         <div>
            <form action="" onSubmit={handleSubmit}>
               <label className="block text-gray-700 font-medium mb-2">
               Email
               </label>

               <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="Enter your email"
               className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-0"
               />

              {isLoding ? (
                <p className="text-center my-4">
                  <span className="loading loading-xl loading-spinner text-error"></span>
                </p>
              ):(
                <button
                  type="submit"
                  className="mt-4 w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-300"
                >
                  Forgot Password
                </button>
              )}
            </form>
            
            {message && <p className="mt-2 font-md">{message}</p>}
         </div>
      </div>
    </div>
  );
}