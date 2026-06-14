import { Routes, Route} from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPages from "../pages/LoginPages";
import DonorPage from "../pages/DonorPage/DonorPage";
import BecomeDonorPage from "../pages/DonorPage/BecomeDonorPage";
import CreateBloodRequestPage from "../pages/BloodRequestPage/CreateBloodRequestPage";
import AllBloodRequestPage from "../pages/BloodRequestPage/AllBloodRequestPage"
import UserProfilePage  from "../pages/UserPage/UserProfilePage";
import EditDashbordPage from "../pages/UserPage/EditDashbordPage";
import EditDonorProfile from "../pages/UserPage/EditDonorProfilePage";
import MyBloodRequestPage from "../pages/BloodRequestPage/MyBloodRequestPage";
import ResetPasswrodPage from "../pages/ResetPasswrodPage";
import ResetPasswrodConfirmPage from "../pages/ResetPasswrodConfirmPage";
import UpdateBloodRequestPage from "../pages/BloodRequestPage/UpdateBloodRequestPage";

const AppRoutes = () => {
   return (
      <Routes> 
         <Route element={<MainLayout/>}>
               <Route path="/" element={<HomePage/>} />
               <Route path="/login" element={<LoginPages/>} />
               <Route path="/register" element={<RegisterPage/>} />
               <Route path="/forgot-password" element={<ResetPasswrodPage />} />
               <Route path="/reset-password/:uid/:token" element={<ResetPasswrodConfirmPage />} />
               <Route path="/find-donor" element={<DonorPage/>} />
               <Route path="/become-donor" element={<BecomeDonorPage/>} />
               <Route path="/all-blood-requests" element={<AllBloodRequestPage/>} />
               <Route path="/create-blood-request" element={<CreateBloodRequestPage/>} />
               <Route path="/my-blood-requests" element={<MyBloodRequestPage />} />
               <Route path="/my-profile" element={<UserProfilePage/>} />
               <Route path="/edit-dashbord" element={<EditDashbordPage/>} />
               <Route path="/edit-donor-profile" element={<EditDonorProfile/>} />
               <Route path="/update-blood-request/:id" element={<UpdateBloodRequestPage />} />
         </Route>
      </Routes>
   );
};

export default AppRoutes;