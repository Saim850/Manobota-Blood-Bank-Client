import api from "../../api"

const GetMyDonorProfile = async() => {
    const res = await api.get("/my-donor-profile/")
    return res.data[0]
}

export default GetMyDonorProfile