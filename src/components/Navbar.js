import React from "react";
import { Link } from "react-router-dom";
 


const Navbar = () => {
  return (
        <nav className="navbar">
            .
            <Link to ='/'>Home</Link>
            <Link to ='/worlds'>Campaign List</Link>
            <Link to ='/createnewcampaign'>Create New Campaign</Link>
            <Link to ='/about'>About</Link>
            .
        </nav>
    )
};

export default Navbar;