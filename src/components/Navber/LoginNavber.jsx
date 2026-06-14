import { Link} from "react-router-dom";
import profileImage from '../../assets/default_profile_image.png'

const LoginNavber = () => {

    return(
        <>
         <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/all-blood-requests">All Blood Request</Link></li>
                    <li><Link to="/create-blood-request">Create Blood Request</Link></li>
                    <li><Link to="/find-donor">Find Donor</Link></li>
                    <li><Link to="/become-donor">Become a Donor</Link></li>
                </ul>
                </div>
                <Link to="/" className="font-bold text-xl ml-5"><span className="text-red-500">DN</span> Blood Bank <span className="text-red-500">.</span></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/all-blood-requests">All Blood Request</Link></li>
                    <li><Link to="/create-blood-request">Create Blood Request</Link></li>
                    <li><Link to="/find-donor">Find Donor</Link></li>
                    <li><Link to="/become-donor">Become a Donor</Link></li>

                </ul>
            </div>
            <div className="navbar-end">
                <Link to="/my-profile">
                    <div tabIndex={0} role="button" className="border-2 border-red-500 rounded-full avatar">
                        <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src={profileImage} />
                        </div>
                    </div>
                </Link>
            </div>
         </div>
        </>
    )
}

export default LoginNavber;