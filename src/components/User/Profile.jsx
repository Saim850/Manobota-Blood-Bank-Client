import { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [donor, setDonor] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user_info = await api.get("/user-info/")
        const donor_info = await api.get("/my-donor-profile/")

        setUser(user_info.data[0])
        setDonor(donor_info.data[0])

      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  const handleClick = async(id) => {
    try{
     const res = await api.delete(`/my-donor-profile/${id}/`)
     console.log(res)
     alert("Your donor profile deleted successfully")
    }catch(error){
      console.log(error.response?.status)
     alert("Somthing went worng!!")

    }
  }

  if (!user) {
    return (
      <div className="flex justify-center mt-5">
        <span className="loading loading-spinner text-error loading-xl mt-5"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Welcome, {user.full_name}
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">
              Donor Information
            </h2>

            <p className="mb-1">
              <strong>Blood Group:</strong>{" "}
              {donor ? (
                donor.blood_group_name
              ):("None")}  
            </p>

            <p className="mb-1">
              <strong>Email:</strong>{" "}
              {user.email}
            </p>

            <p className="mb-1">
              <strong>Phone:</strong>{" "}
              {user.phone_number}
            </p>

            <p className="mb-1">
              <strong>District:</strong>{" "}
              {donor ? (
                donor.district_name
              ):("None")}  
            </p>

            <p className="mb-1">
              <strong>Upazila:</strong>{" "}
              {donor ? (
                donor.upazila_name
              ):("None")}  
            </p>

            <p className="mb-1">
              <strong>Full Address:</strong>{" "}
              {donor ? (
                donor.full_address
              ):("None")}  
            </p>

            <p className="mb-1">
              <strong>Status:</strong>
              {donor ? (
                donor.available ?(
                  <span className="text-green-600 ml-2">
                    Available
                  </span>
                ):(
                  <span className="text-red-600 ml-2">
                    Not Avaliable
                  </span>
                )
              ):("None")}  
            </p>
          </div>

          {/* Statistics */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">
              Donation Statistics
            </h2>

            <p className="mb-1">
              <strong>Total Donations:</strong>{" "}
              {donor ? (
                donor.total_donations
              ):("none")}  
            </p>

            <p className="mb-1">
              <strong>Last Donation:</strong>{" "}
              {donor ? (
                donor.last_donation_date || "Not Yet"
              ):("None")}  
            </p>
          </div>

          {/* Actions */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">
              Quick Actions
            </h2>

            <button className="w-full bg-green-600 text-white p-3 rounded mb-3">
              <Link to="/edit-dashbord">Edit Dashbord</Link>
            </button>


            {donor ? (
              <div className="">
                <button className="w-full bg-blue-600 text-white p-3 rounded mb-3">
                  <Link to="/edit-donor-profile">Edit Your Donor Profile</Link>
                </button>
                <button onClick={() => handleClick(donor.id)} className="w-full bg-gray-800 text-white p-3 rounded mb-3">
                  Delete Your Donor Profile
                </button>
              </div>
            ):(
              <button className="w-full bg-gray-800 text-white p-3 rounded mb-3">
                <Link to='/find-donor'>Find Donor</Link>
              </button>
            )}


            <button
              className="w-full bg-red-600 text-white p-3 rounded"
              onClick={() => {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}