import { useEffect, useState } from "react";
import api from "../../api";
import GetBlood from "../API_Data/GetBlood";
import GetDsitrict from "../API_Data/GetDistrict";
import GetUpazila from "../API_Data/GetUpazila";
import { useParams } from "react-router-dom";


export default function UpdateBloodRequest() {
  const [allBlood, setBlood] = useState([])
  const [allDistrict, setDistrict] = useState([])
  const [allUpazila, setUpazila] = useState([])
  const [isLoding, setLoding] = useState(true)
  const { id } = useParams()
  
  const [formData, setFormData] = useState({
    patient_name: "",
    blood_group: "",
    phone: "",
    district: "",
    upazila: "",
    blood_units: "",
    required_date: "",
    hospital_name: "",
    message: "",
  });

  useEffect(() =>  {
    const fetchData = async() => {
      try{
        const[bloods, districts, upazilas, request] = await Promise.all([
          GetBlood(),
          GetDsitrict(),
          GetUpazila(),
          await api.get(`/my-blood-request/${id}`)
        ]);
        setBlood(bloods);
        setDistrict(districts);
        setUpazila(upazilas);
        setFormData({
          patient_name: request.data.patient_name,
          blood_group: request.data.blood_group,
          phone: request.data.phone,
          district: request.data.district,
          upazila: request.data.upazila,
          hospital_name: request.data.hospital_name,
          required_date: request.data.required_date,
          blood_units: request.data.blood_units,
          message: request.data.message,
        })
        console.log(request.data)
      }catch(error){
        console.log(error)
      }finally{
        setLoding(false)
      }
    }
    fetchData();
  }, [])


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/blood-request/", formData)
      alert("Blood request submitted successfully!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to submit request");
    }
  };

  return (
    <div className="min-h-screen bg-red-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-4xl shadow-xl p-8 md:p-10">

        <div className="text-center mb-10">
          <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold mb-4">
            Blood Request Form
          </div>

          <h1 className="text-4xl font-bold text-gray-800">
            Update Your Blood Request
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Request blood for patients in need and connect with nearby donors.
          </p>
        </div>

        {isLoding ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner text-error loading-xl mt-5"></span>
          </div>
        ):(
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Patient Name */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Patient Name
              </label>

              <input
                type="text"
                name="patient_name"
                value={formData.patient_name}
                onChange={handleChange}
                placeholder="Enter patient name"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            </div>

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

            {/* Phone */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                required
              />
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

            {/* Hospital Name */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Hospital Name
              </label>

              <input
                type="text"
                name="hospital_name"
                value={formData.hospital_name}
                onChange={handleChange}
                placeholder="Enter hospital name"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            </div>

            {/* Blood Units */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Blood Units Required
              </label>

              <input
                type="number"
                name="blood_units"
                value={formData.blood_units}
                onChange={handleChange}
                placeholder="Required blood units"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            </div>

            {/* Required Date */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Required Date
              </label>

              <input
                type="date"
                name="required_date"
                value={formData.required_date}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Reason / Description
              </label>

              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe the patient's condition or blood requirement"
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-semibold text-lg transition"
            >
              Submit Blood Request
            </button>

          </form>
        )}
      </div>
    </div>
  );
}