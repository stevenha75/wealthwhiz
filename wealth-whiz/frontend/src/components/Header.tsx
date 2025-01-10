import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuthContext } from "../context/AuthContext"; // Import AuthContext
import { logout } from "../services/authService"; // Import logout function

const Header = () => {
    const { user } = useAuthContext(); // Access user from context
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await logout(); // Call the logout function
            navigate("/"); // Redirect to home after logout
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div className="header">
            <h1 className="logo">Budget</h1>
            <div className="links">
                {!user ? (
                    <>
                        <Link to="/" className="header-link">Home</Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/"
                            className="header-link"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent navigation
                                handleSignOut();
                            }}
                        >
                            Sign Out
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
