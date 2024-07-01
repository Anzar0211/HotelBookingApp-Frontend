import { useAppContext } from "../contexts/AppContext";
import { IoMdMenu } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import { useState } from "react";

const Header = () => {
    const { isLoggedIn } = useAppContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">BookAway.com</Link>
                </span>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white text-3xl mr-2">
                        {isMenuOpen ? <ImCross /> : <IoMdMenu />}
                    </button>
                </div>
                <span className="hidden md:flex space-x-2">
                    {isLoggedIn ? (
                        <>
                            <Link className="flex items-center text-white px-3 font-bold hover:bg-blue-600" to="/my-bookings">My Bookings</Link>
                            <Link className="flex items-center text-white px-3 font-bold hover:bg-blue-600" to="/my-hotels">My Hotels</Link>
                            <SignOutButton />
                        </>
                    ) : (
                        <Link className="flex items-center bg-white text-blue-600 px-3 py-1 font-bold hover:bg-gray-100" to="/sign-in">Sign In</Link>
                    )}
                </span>
            </div>

            {/* Sidebar for smaller screens */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleMenu}>
                    <div className="fixed top-0 left-0 h-full bg-blue-800 w-64 p-4">
                        <div className="flex flex-col mt-5 space-y-2 gap-10 justify-center items-center">
                            {isLoggedIn ? (
                                <>
                                    <Link className="text-white px-3 font-bold text-2xl hover:bg-blue-600" to="/my-bookings" onClick={toggleMenu}>My Bookings</Link>
                                    <Link className="text-white px-3 font-bold text-2xl hover:bg-blue-600" to="/my-hotels" onClick={toggleMenu}>My Hotels</Link>
                                    <div className="text-2xl">
                                        <SignOutButton/>
                                    </div>
                                    
                                </>
                            ) : (
                                <Link className="bg-white text-blue-600 px-3 w-3/5 py-3 font-bold text-xl hover:bg-gray-100" to="/sign-in" onClick={toggleMenu}>Sign In</Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
