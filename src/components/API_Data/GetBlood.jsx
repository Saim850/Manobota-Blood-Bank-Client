import api from "../../api";

const GetBlood = async() => {
    try{
      const res = await api.get('/blood-group/')
      return res.data;
    }catch(error){
      console.log(error)
    }
}   
export default GetBlood