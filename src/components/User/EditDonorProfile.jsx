  import {useEffect, useState } from "react";
  import GetBlood from "../API_Data/GetBlood";
  import GetDsitrict from "../API_Data/GetDistrict";
  import GetUpazila from "../API_Data/GetUpazila";
  import api from "../../api";
  import GetMyDonorInfo from "../API_Data/GetMyDonorInfo"

  const EditDonorProfile = () => {
    const [allBlood, setBlood] = useState([])
    const [allDistrict, setDistrict] = useState([])
    const [allUpazila, setUpazila] = useState([])
    const [formData, setFormData] = useState({
      blood_group: "",
      district: "",
      upazila: "",
      last_donation_date: "",
      total_donations:"",
      full_address: "",
      available: false,
    });
    const [isLoding, setLoding] = useState(true);

    useEffect(() =>  {
      const fetchData = async() => {
        try{
          const[bloods, districts, upazilas, donor] = await Promise.all([
            GetBlood(),
            GetDsitrict(),
            GetUpazila(),
            GetMyDonorInfo(),
          ]);

          setBlood(bloods);
          setDistrict(districts);
          setUpazila(upazilas);

          setFormData({
            blood_group: donor.blood_group,
            district: donor.district,
            upazila: donor.upazila,
            last_donation_date: donor.last_donation_date,
            total_donations: donor.total_donations,
            full_address: donor.full_address,
            available: donor.available,
          })
          
        }catch(error){
          console.log(error)
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
        const profile = await api.get("/my-donor-profile/");
        const res = await api.put(`/my-donor-profile/${profile.data[0].id}/`, formData);
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
                  Donor Profile
              </div>

              <h1 className="text-4xl font-bold text-gray-800">
                  Edit Your Donor Profile
              </h1>

              <p className="text-gray-500 mt-4 text-lg">
                  Update your donor information and availability.
              </p>
              </div>

              {isLoding ? (
                <div className="flex justify-center">
                  <span className="loading loading-spinner text-error loading-xl mt-5"></span>
                </div>
              ):(
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Blood Group */}
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Blood Group
                      </label>

                      <select
                      name="blood_group"
                      value={formData.blood_group}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                      required
                      >
                      <option value="">Select Blood Group</option>
                      {allBlood.map((val) => (
                          <option key={val.id} value={val.id}>
                            {val.name}
                          </option>
                      ))}
                      </select>
                    </div>

                    {/* District */}
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                      District
                      </label>

                      <select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                      required
                      >
                      <option value="">Select District</option>
                      
                      {allDistrict.map((val) => (
                          <option key={val.id} value={val.id}>
                            {val.name}
                          </option>
                      ))}
                      </select>
                    </div>

                    {/* Upazila */}
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Upazila
                      </label>

                      <select
                      name="upazila"
                      value={formData.upazila}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                      required
                      >
                      <option value="">Select Upazila</option>

                      {allUpazila.map((val) => (
                          <option key={val.id} value={val.id}>
                            {val.name}
                          </option>
                      ))}
                      </select>
                    </div>

                    {/* last donations date */}
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Last Donations Date
                      </label>

                      <input
                      type="date"
                      name="last_donation_date"
                      value={formData.last_donation_date}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-red-400 outline-none"
                      />
                    </div>

                    {/* total donations  */}
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Total Donations
                      </label>

                      <input
                      type="number"
                      name="total_donations"
                      value={formData.total_donations}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-red-400 outline-none"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Full Address
                      </label>

                      <textarea
                      rows="4"
                      name="full_address"
                      value={formData.full_address}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-2xl px-4 py-3 resize-none focus:ring-2 focus:ring-red-400 outline-none"
                      required
                      />
                    </div>

                    {/* Availability */}
                    <div className="flex items-center gap-3">
                      <input
                      type="checkbox"
                      name="available"
                      checked={formData.available}
                      onChange={handleChange}
                      />

                      <label className="font-medium text-gray-700">
                      Available for Blood Donation
                      </label>
                    </div>

                    {isLoding?(
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

  export default EditDonorProfile;