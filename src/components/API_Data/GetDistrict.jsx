import api from "../../api"

const GetDsitrict = async() => {
    try{
      const res = await api.get('/district/')
      return res.data;
    }catch(error){
      console.log(error)
    }
}
export default GetDsitrict