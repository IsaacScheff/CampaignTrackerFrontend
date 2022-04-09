import React from "react";
import {  useNavigate  } from "react-router-dom";
import { Button } from "@mui/material";


const RandomWorldButton = (props) => {

    const navigate = useNavigate();

    const onClick = () => {
        const randomWorld = props.worlds[Math.floor(Math.random() * props.worlds.length)]; 
        navigate(`/worlds/${randomWorld.id}`);
    }

    return (
            <Button
                onClick={onClick}
                variant="contained"
                sx={{marginBottom: "10px", marginRight: "20px"}}
            >
                  Random Campaign
            </Button>
    );
};
  
  export default RandomWorldButton;