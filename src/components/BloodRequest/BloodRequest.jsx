import { Link } from "react-router-dom";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
  
const BloodRequest = ({requests, isMyBloodRequest, page, setPage, totalPages}) => {

  const handleDelete= async(id) => {
    try{
      const res = await api.delete(`/my-blood-request/${id}/`)
      alert("You blood request deleted successfully.")
      console.log(res)
    }catch(error){
      console.log(error.response?.data)
      console.log(error.response?.status)
    }
  }

const navigate = useNavigate();
const handleUpdate = (id) => {
  navigate(`/update-blood-request/${id}`);
};

  return (
    <div className="min-h-screen bg-red-50 p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
        🩸 All Blood Requests
      </h1>

      <div className="flex justify-end my-3">
        <Link to="/my-blood-requests" className="text-white font-bold p-2 bg-red-500 rounded-md">My Blood Request</Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white shadow-md rounded-xl p-4 border border-red-100 flex justify-between"
          >
            <div className="">
              <h2 className="text-xl font-semibold text-red-700">
                {req.patient_name}
              </h2>

              <p>
                <span className="font-semibold">Blood Group:</span>{" "}
                {req.blood_group_name}
              </p>

              <p>
                <span className="font-semibold">Phone:</span> {req.phone}
              </p>

              <p>
                <span className="font-semibold">Location:</span>{" "}
                {req.district_name}, {req.upazila_name}
              </p>

              <p>
                <span className="font-semibold">Hospital:</span>{" "}
                {req.hospital_name}
              </p>

              <p>
                <span className="font-semibold">Blood Units:</span>{" "}
                {req.blood_units}
              </p>

              {req.message && (
                <p>
                  <span className="font-semibold">Message:</span>{" "}
                  {req.message}
                </p>
              )}

              <p className="text-sm font-bold mt-2">
                {new Date(req.created_at).toLocaleString()}
              </p>
            </div>
            <div className="">
              {isMyBloodRequest ? (
                <div className="flex flex-col gap-2">
                  <button className="w-full bg-green-500 text-white font-bold p-2 rounded-md" onClick={() => handleUpdate(req.id)}>Update</button>
                  <button className="w-full bg-red-500 text-white font-bold p-2 rounded-md" onClick={() => handleDelete(req.id)}>Delete</button>
                </div>
              ):(
                <a
                  href={`tel:+880${req.user.phone_number}`}
                  className="flex justify-center gap-2 w-full mt-6 bg-red-600 hover:bg-red-700 text-white p-3 rounded-2xl font-semibold transition duration-300"
                >
                  <Phone size={20} />
                  Contact
                </a>
              )}
            </div>

          </div>
        ))}
      </div>

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
    </div>
  );
}
export default BloodRequest;