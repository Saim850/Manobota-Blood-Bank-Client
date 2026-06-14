import api from "../../api";

const GetDonor = async() => {
   try{
      const res = await api.get("/donor/");
      return res.data
   }catch (err) { 
      console.log(err);
   }
}

export default GetDonor;