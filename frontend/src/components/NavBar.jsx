import { useEffect, useState } from "react";
import {Link} from "react-scroll";
import { RxCross1 } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";
import logo from '../assets/logo.png';
import { toast } from "sonner";

const NavBar = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleNavbar = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }

     const [username, setUsername] = useState(null);

    useEffect(() => {
        // Get username from localStorage on component mount
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
        setUsername(savedUsername);
        }
    }, []);

    const [loggedOut, setLoggedOut] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        setUsername(null);
        if(username){
            window.location.href = "/"; 
            setLoggedOut(true);
        }
        
        if (loggedOut) {
            toast.success("Logged out successfully!");
        }
    };

  return (
    <nav className="fixed w-[80%] top-1 z-1 bg-black/20 rounded-2xl text-white place-items-center left-1/2 -translate-x-1/2">
        <div className="container px-4 mx-auto relative text-sm">
            <div className="flex justify-between items-center">
                <div className="flex items-center flex-shrink-0">
                    <a><img src={logo}  alt="logo" className="w-25 h-12 -rotate-5"></img></a>

                </div>
                
                <ul className="hidden lg:flex space-x-12">

                    <Link to="home" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1.5)' }} spy={true} smooth={true} duration={400} offset={0} activeClass="">
                    <li className="cursor-pointer p-1 transition-all w-fit duration-300 text-neutral-300 hover:text-white hover:rounded-lg hover:translate-x-0.5 activetranslate-x-0">Home</li>
                     </Link>
                    {username && <Link to="uploads" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1.5)' }} spy={true} smooth={true} duration={400} offset={5} activeClass="">
                    <li className="cursor-pointer p-1 transition-all w-fit duration-300 text-neutral-300 hover:text-white hover:rounded-lg hover:translate-x-0.5 activetranslate-x-0">Uploads</li>
                    </Link>}
                    <Link to="footer" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1.5)' }} spy={true} smooth={true} duration={400} offset={5} activeClass="">
                    <li className="cursor-pointer p-1 transition-all w-fit duration-300 text-neutral-300 hover:text-white hover:rounded-lg hover:translate-x-0.5 activetranslate-x-0">Footer</li>
                    </Link>
                    
                </ul>
                <div className="hidden lg:flex space-x-10 items-center">
                {username && <><h1>Welcome, {username}</h1>
                <button onClick={handleLogout} className="px-3 py-2 border rounded-md hover:translate-y-0.5 duration-200">Logout </button></>}
                </div>
                <div className="lg:hidden md:flex flex-col justify-end">
                    <button onClick={toggleNavbar}>
                        {mobileMenuOpen ? <RxCross1 /> : <IoMenu />}
                    </button>
                </div>
            </div>
            {mobileMenuOpen && (
                <div className="fixed right-0 z-2 bg-black/90 w-full h-[100dvh] p-12 flex flex-col justify-between items-center lg:hidden">
                    <ul className="grid grid-cols-2">

                    <a className={(e)=>{return e.isActive ? "text-orange-400" : ""}}><li className="cursor-pointer py-4 hover:text-orange-400">Home</li></a>
                    <a className={(e)=>{return e.isActive ? "text-orange-400" : ""}}><li className="cursor-pointer py-4 hover:text-orange-400">Features</li></a>
                    <a className={(e)=>{return e.isActive ? "text-orange-400" : ""}}><li className="cursor-pointer py-4 hover:text-orange-400">About</li></a>
                    <a className={(e)=>{return e.isActive ? "text-orange-400" : ""}}><li className="cursor-pointer py-4 hover:text-orange-400">Contact</li></a>
                </ul>
                <button onClick={handleLogout} className="px-3 py-2 border rounded-md hover:translate-y-0.5 duration-200">Logout </button>
                </div>
            )}
        </div>
    </nav>
  )
}

export default NavBar