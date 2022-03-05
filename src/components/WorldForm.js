import React, { useEffect, useState } from "react";
import { createWorld, clearWorldError } from "../redux/worlds";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../dev";
import { Button, TextField, Paper } from "@mui/material";

const WorldForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const worldError = useSelector((state) => state.worldError);

    const [worldDescription, setWorldDescription] = useState("");
    const [worldName, setWorldName] = useState("");
    const [worldImage, setWorldImage] = useState("");
    const [createAttempt, setCreateAttempt] = useState(false);

    useEffect(()=>{
        if(!worldError && createAttempt){
            redirect();
        }
    }, [createAttempt, worldError]);

    const onChange = (event) => {
        switch (event.target.name){
            case 'name':
                setWorldName(event.target.value);
                break;
            case 'description':
                setWorldDescription(event.target.value);
                break;
            case 'imageUrl':
                setWorldImage(event.target.value);
                break;  
            default:
                console.log("onChange non selected value");
        }
    }

    async function onSubmit(event){
        event.preventDefault();
        const world = {
            name: worldName,
            description: worldDescription,
            UserId: 1               
        }
        if(worldImage)
            world.imageUrl = worldImage
          
        await dispatch(createWorld(world));
        setCreateAttempt(true);
    }
    
    async function redirect(){
        const {data} = await axios.get(`${api}/worlds/name/${worldName}`);
        navigate(`/worlds/${data.id}`);
    }

    const clearError = () => {
        setCreateAttempt(false);
        dispatch(clearWorldError());
    }

    const contentSizer = (element) => {
        element.target.style.height = "1px";
        element.target.style.width = "50%";
        element.target.style.height = (25 + element.target.scrollHeight) + "px";
    }

    if(!worldError){
        return (
            <Paper sx={{
                width: "50%",
                margin: "auto",
                backgroundColor: "#f0bf7a"
            }}>
                <form
                    onSubmit={onSubmit}
                    className="new-world-form"
                >
                    <h1>
                        Create New Campaign
                    </h1>
                    <TextField label="Name" name="name" variant="filled" onChange={onChange} value={worldName}/>
                    <p>
                        <textarea 
                            name="description" 
                            onClick={contentSizer} 
                            onKeyUp={contentSizer} 
                            onChange={onChange} 
                            value={worldDescription} 
                            placeholder="description"
                        />
                    </p>
                    <TextField  label="imageUrl" name="imageUrl" variant="filled" onChange={onChange} placeholder="optional"/>
                    <div>
                        <Button variant="contained" type="submit" disabled={worldName.length < 1} 
                            sx={{marginTop: "10px", marginBottom: "10px"}}
                        >
                            Create!
                        </Button>
                    </div>
                </form>
            </Paper>
        );
        }else{
            return (
                <div className="create-world-error">
                    <p>{worldError}</p>
                    <button onClick={clearError}>
                        Ok!
                    </button>
                </div>
            );
    }
  };
  
  export default WorldForm;