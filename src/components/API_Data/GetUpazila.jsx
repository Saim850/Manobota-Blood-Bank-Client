import api from "../../api";

const GetUpazila = async() => {
    try{
      const res = await api.get('/upazila/')
      return res.data;
    }catch(error){
      console.log(error)
    }
}
export default GetUpazila;