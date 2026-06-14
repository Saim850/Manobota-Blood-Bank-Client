import api from "../../api";

const GetUserInfo = async() => {
    const res = await api.get('/user-info/');
    return res.data;
}

export default GetUserInfo;