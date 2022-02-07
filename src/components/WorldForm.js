import React, { useState, useRef } from "react";
import { createWorld } from "../redux/worlds";
import { useDispatch, useSelector } from "react-redux";
import {  useParams, useNavigate  } from "react-router-dom";
import axios from "axios";

const WorldForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [worldDescription, setWorldDescription] = useState("");
    const [worldName, setWorldName] = useState("");
    const [worldImage, setWorldImage] = useState("");

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
            //imageUrl: worldImage,
            UserId: 1,                 
        }
        await dispatch(createWorld(world));
        const {data} = await axios.get(`http://localhost:1337/worlds/name/${worldName}`);
        navigate(`/worlds/${data.id}`);
    }

    return (
        <form
            onSubmit={onSubmit}
        >

            <label htmlFor="name">Name</label>
            <input name="name" onChange={onChange} value={worldName}/>
            <p>
                <label htmlFor="description">Description</label>
                <input name="description" onChange={onChange} value={worldDescription}/>
            </p>
            <p>
                <label htmlFor="imageUrl">ImageUrl</label>
                <input name="imageUrl" onChange={onChange} placeholder="optional"/>
            </p>
            <div>
                <button type="submit" disabled={worldName.length < 1}>
                    Create!
                </button>
            </div>
	
	    </form>
    );
  };
  
  export default WorldForm;