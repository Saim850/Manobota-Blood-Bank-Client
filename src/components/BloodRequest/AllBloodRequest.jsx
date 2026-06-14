import { useEffect, useState } from "react";
import api from "../../api"
import BloodRequest from "./BloodRequest";

export default function AllBloodRequest() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    try {
      const res = await api.get(`/blood-request/?page=${page}`);
      setRequests(res.data.results);
      setCount(res.data.count)

    } catch (err) {
      console.error(err);
      setError("Failed to load blood requests");
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, [page])

  const totalPages = Math.ceil(count/10);

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner text-error loading-xl mt-5"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return(
    <BloodRequest requests={requests} isMyBloodRequest={false} page={page} setPage={setPage} totalPages={totalPages}/>
  )
} 