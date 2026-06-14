import {useEffect, useState } from "react";
import api from '../../api'
import GetBlood from "../API_Data/GetBlood";
import GetDsitrict from "../API_Data/GetDistrict";
import GetUpazila from "../API_Data/GetUpazila";
import { Phone } from "lucide-react";

const DonorProfile = () => {
  const [donors, setDonors] = useState([]);
  const [bloodGroups, setBloodGroups] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [isLoding, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [selectedBlood, setSelectedBlood] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [available, setAvailable] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      let url = `/donor/?page=${page}`;

      if (selectedBlood)
        url += `&blood_group=${selectedBlood}`;

      if (selectedDistrict)
        url += `&district=${selectedDistrict}`;

      if (selectedUpazila)
        url += `&upazila=${selectedUpazila}`;

      if (available !== "")
        url += `&available=${available}`;

      const [donorRes, upazilaRes, districtRes, bloodRes] =
        await Promise.all([
          api.get(url),
          GetUpazila(),
          GetDsitrict(),
          GetBlood(),
        ]);

      setDonors(donorRes.data.results);
      setCount(donorRes.data.count);

      setUpazilas(upazilaRes);
      setDistricts(districtRes);
      setBloodGroups(bloodRes);

    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    page,
    selectedBlood,
    selectedDistrict,
    selectedUpazila,
    available,
  ]);

  const totalPages = Math.ceil(count / 10);
  return (
    <div className="min-h-screen bg-red-50 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-red-600 mb-10">
          Blood Donors
        </h1>

        {/* filtering sections */}
        <div className="flex flex-wrap gap-5 my-5">
          <select
            value={selectedBlood}
            onChange={(e) => setSelectedBlood(e.target.value)}
            className="border-2 p-2 rounded font-medium"
          >
            <option value="">All Blood Groups</option>

            {bloodGroups.map((blood) => (
              <option key={blood.id} value={blood.id}>
                {blood.name}
              </option>
            ))}
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="border-2 p-2 rounded font-medium"
          >
            <option value="">All Districts</option>

            {districts.map((val) => (
              <option
                key={val.id}
                value={val.id}
              >
                {val.name}
              </option>
            ))}
          </select>

          <select
            value={selectedUpazila}
            onChange={(e) => setSelectedUpazila(e.target.value)}
            className="border-2 p-2 rounded font-medium"
          >
            <option value="">All Upazilas</option>

            {upazilas.map((val) => (
              <option
                key={val.id}
                value={val.id}
              >
                {val.name}
              </option>
            ))}
          </select>

          <select
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            className="border-2 p-2 rounded font-medium"
          >
            <option value="">All Donors</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>

        </div>

        {isLoding?(
          <div className="flex justify-center">
            <span className="loading loading-spinner text-error loading-xl mt-5"></span>
          </div>
        ):(
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donors.map((val) => (
              <div
                key={val.id}
                className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {val.user.full_name}
                  </h2>

                  <div className="bg-red-600 text-white px-4 py-2 rounded-full text-lg font-semibold">
                    {val.blood_group_name}
                  </div>
                </div>

                <div className="space-y-3 text-gray-700">
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {val.user.phone_number}
                  </p>

                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {val.user.email}
                  </p>

                  <p>
                    <span className="font-semibold">District:</span>{" "}
                    {val.district_name}
                  </p>

                  <p>
                    <span className="font-semibold">Upazila:</span>{" "}
                    {val.upazila_name}
                  </p>

                  <p>
                    <span className="font-semibold">Full Address:</span>{" "}
                    {val.full_address}
                  </p>

                  <p>
                    <span className="font-semibold">Last Donation:</span>{" "}
                    {val.last_donation_date}
                  </p>

                  <div className="pt-2">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        val.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {val.available
                        ? "Available for Donation"
                        : "Not Available"}
                    </span>
                  </div>
                </div>

                <a
                  href={`tel:+880${val.user.phone_number}`}
                  className="flex justify-center gap-2 w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-2xl font-semibold transition duration-300"
                >
                  <Phone size={20} />
                  Contact
                </a>
              </div>
            ))}
          </div>
        )}

        {!isLoding && (
          // paganations
          <div className="join flex justify-center mt-7">
            <button 
              className="join-item btn"
              disabled={page === 1}
              onClick={() => setPage(page-1)}
            >
              «
            </button>

            <button className="join-item btn">{page} / {totalPages}</button>

            <button 
              className="join-item btn"
              disabled={page === totalPages}
              onClick={() => setPage(page+1)}
            >
              »
            </button>

          </div>
        )}

      </div>
    </div>
  )
} 

export default DonorProfile;