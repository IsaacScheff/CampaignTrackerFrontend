import React, { useState } from "react";
import {  useNavigate  } from "react-router-dom";
import axios from "axios";
import SearchErrorMessage from "./SearchErrorMessage";


const WorldSearchForm = () => {

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchError, setSearchError] = useState(false);

    const onChange = (event) => {
        setSearchTerm(event.target.value);
        setSearchError(false);
    }

    async function onSubmit (event){
        event.preventDefault();
        const {data} = await axios.get(`http://localhost:1337/worlds/name/${searchTerm}`);
        if(data){
            navigate(`/worlds/${data.id}`);
        }else{
            setSearchError(true);
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
            <div className="world-search-failed">
                {searchError ? <SearchErrorMessage /> : null}
            </div>
        </form>
    );
  };
  
  export default WorldSearchForm;