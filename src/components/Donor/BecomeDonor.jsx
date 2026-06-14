import { useEffect, useState } from "react";
import api from "../../api";
import GetBlood from "../API_Data/GetBlood";
import GetDsitrict from "../API_Data/GetDistrict";
import GetUpazila from "../API_Data/GetUpazila";

export default function CreateDonorProfile() {
  const [bloodGroups, setBloodGroups] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [isLoding, setLoding] = useState(true);

  useEffect(() => {
    const fetchData = async() => {
      try{
        const [bloods, districts, upazilas] = await Promise.all([
          GetBlood(),
          GetDsitrict(),
          GetUpazila(),
        ])
        setBloodGroups(bloods);
        setDistricts(districts);
        setUpazilas(upazilas);
      }catch(error){
        console.log(error)
      }finally{
        setLoding(false)
      }
    }
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
  blood_group: "",
  district: "",
  upazila: "",
  full_address: "",
  available: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData, 
      [name]:type === "checkbox" ? checked : value,})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/donor/", formData);
      alert("Donor profile created successfully");

      setFormData({
        blood_group: "",
        district: "",
        upazila: "",
        full_address: "",
        available: false,
      });
    } catch (error) {
      console.log(error.response?.data);
      alert(`${error.response?.data}`);
    }finally{
      setLoding(false)
    }
  };

  return (
    <div className="min-h-screen bg-red-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-4xl shadow-xl p-8 md:p-10">
        <div className="text-center mb-10">
          <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold mb-4">
            Blood Donation Form
          </div>

          <h1 className="text-4xl font-bold text-gray-800">
            Create Donor Profile
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Register yourself as a blood donor and help save lives.
          </p>
        </div>

        {isLoding?(
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

                {bloodGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
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

                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
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

                {upazilas.map((upazila) => (
                  <option key={upazila.id} value={upazila.id}>
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Full Address */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Full Address
              </label>

              <textarea
                rows="4"
                name="full_address"
                value={formData.full_address}
                onChange={handleChange}
                placeholder="Enter your full address"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400 resize-none"
                required
              ></textarea>
            </div>

            {/* Available */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.available}
                name="available"
                onChange={handleChange}
                className="w-5 h-5 accent-red-500"
              />

              <label className="text-gray-700 font-medium">
                Available for blood donation
              </label>
            </div>

            {isLoding ? (
              <p className="text-center my-4">
                <span className="loading loading-xl loading-spinner text-error"></span>
              </p>
            ):(
              <button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold text-lg transition"
              >
                Create Donor Profile
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
