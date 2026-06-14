import Navber from "./Navber";
import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <>
          <Navber/>
          <Outlet/>
        </>
    );
};

export default MainLayout;