import LoginNavber from "../components/Navber/LoginNavber";
import LogOutNavber from "../components/Navber/LogOutNavber";

const Navber = () =>{
    const isLoggedIn = !!localStorage.getItem("access");
    
    return(
        <>
          {isLoggedIn ? (<LoginNavber/>):(<LogOutNavber/>)}
        </>
    );
};

export default Navber