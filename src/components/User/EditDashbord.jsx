import {useEffect, useState } from "react";
import api from "../../api";

const EditDashbord = () => {
  const [isLoding, setLoding] = useState(true)
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
  });
  const [profile, setProfile] = useState([])

  useEffect(() => {
    const fetchData = async() => {
        try{
          const profile = await api.get("/user-info/");
          const data = profile.data[0]
          setProfile(data)
          setFormData({
              full_name:data.full_name,
              email:data.email,
              phone_number:data.phone_number,
          })
        }catch(error){
          console.log(error.response)
        }finally{
          setLoding(false)
        }
    }
    fetchData();
  }, [])

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const res = await api.put(`/user-info/${profile.id}/`, formData);
        alert("Profile updated successfully");
        console.log(res.data);
    } catch (error) {
        console.log(error.response?.data);
        console.log(error.response?.status);
        alert("Failed to update profile");
    }
  };

  return(
    <>
      <div className="min-h-screen bg-red-50 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-4xl shadow-xl p-8 md:p-10">
          <div className="text-center mb-10">
            <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold mb-4">
              User Profile
            </div>

            <h1 className="text-4xl font-bold text-gray-800">
              Edit Your User Informations
            </h1>

            <p className="text-gray-500 mt-4 text-lg">
              Update your user information and password.
            </p>
          </div>
          {isLoding?(
            <div className="flex justify-center">
                <span className="loading loading-spinner text-error loading-xl mt-5"></span>
            </div>
          ):(
            <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                Full Name
                </label>

                <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-red-400 outline-none"
                />
            </div>

            {/* Email */}
            <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email
                </label>

                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-red-400 outline-none"
                />
            </div>

            {/* Phone */}
            <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                Phone Number
                </label>

                <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                required
                />
            </div>

            {isLoding ?(
              <p className="text-center my-4">
                <span className="loading loading-xl loading-spinner text-error"></span>
              </p>
            ):(
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold text-lg transition"
              >
                Update Profile
              </button>
            )}  
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default EditDashbord;