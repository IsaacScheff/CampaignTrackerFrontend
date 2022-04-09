import React from "react";
import { Link } from "react-router-dom";
import { Button, TextField, Paper } from "@mui/material";
 


const Navbar = () => {
  return (
        <Paper sx={{
            height: "40px"
        }}>
            <nav className="navbar">
                .
                <Link to ='/'>Home</Link>
                <Link to ='/worlds'>Campaign List</Link>
                <Link to ='/createnewcampaign'>Create New Campaign</Link>
                <Link to ='/about'>About</Link>
                .
            </nav>
        </Paper>
    )
};

export default Navbar;