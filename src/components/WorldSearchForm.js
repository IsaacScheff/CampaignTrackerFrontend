import React, { useState, useRef } from "react";
import { createWorld } from "../redux/worlds";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate  } from "react-router-dom";
import axios from "axios";

const WorldSearchForm = () => {

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const onChange = (event) => {
        setSearchTerm(event.target.value);
    }

    async function onSubmit (event){
        event.preventDefault();
        const {data} = await axios.get(`http://localhost:1337/worlds/name/${searchTerm}`);
        if(data){
            navigate(`/worlds/${data.id}`);
        }else{
            console.log("world not found");
            console.log(data);
            //mesage to user/other actions here
        }
    }

    return (
        <form onSubmit={onSubmit} className="world-search-form">
          <label htmlFor="campaign-search">Search</label>
          <input 
            name="name" 
            onChange={onChange} 
            value={searchTerm}
            placeholder="Campaign title"
        />
        </form>
    );
  };
  
  export default WorldSearchForm;