import { useState } from "react";
import api from "../api";

export default function ForgotPassword() {

  const [formData, setFormData] = useState({
    email:"",
    phone_number:"",
  });

  const [message, setMessage] = useState("");
  const [isLoding , setLoding] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true)
    try {
      await api.post('forgot-password/', formData)

      setMessage("Password reset email sent. Check your email.");
    } catch (error) {
      console.error(error.response?.data);
      setMessage("Something went wrong.");
    } finally{
      setLoding(false)
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
     }
    )
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-linear-to-r bg-red-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
         <h1 className="text-3xl font-bold text-center text-gray-800">
            Delete Your Account
         </h1>

         <p className="text-center text-gray-500 mt-2">
          Delete someone's account
         </p>

         <div>
            <form action="" onSubmit={handleSubmit}>
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

               <label className="block text-gray-700 font-medium mb-2 mt-5">
               Phone Number
               </label>

               <input
               type="tel"
               name="phone_number"
               value={formData.phone_number}
               onChange={handleChange}
               placeholder="Enter your phone number"
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
                  Delete Your Account
                </button>
              )}
            </form>
            
            {message && <p className="mt-2 font-md">{message}</p>}
         </div>
      </div>
    </div>
  );
}