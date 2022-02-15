import React, { useEffect, useState } from "react";
import { createWorld, clearWorldError } from "../redux/worlds";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

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
        const {data} = await axios.get(`http://localhost:1337/worlds/name/${worldName}`);
        navigate(`/worlds/${data.id}`);
    }

    const clearError = () => {
        setCreateAttempt(false);
        dispatch(clearWorldError());
    }

    if(!worldError){
        return (
            <div>
                <form
                    onSubmit={onSubmit}
                    className="new-world-form"
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
            </div>
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