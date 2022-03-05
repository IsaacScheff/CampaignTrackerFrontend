import React, { useState } from "react";
import {  useNavigate  } from "react-router-dom";
import axios from "axios";
import SearchErrorMessage from "./SearchErrorMessage";
import api from "../dev";
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField, Container } from "@mui/material";


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
        const {data} = await axios.get(`${api}/worlds/name/${searchTerm}`);
        if(data){
            navigate(`/worlds/${data.id}`);
        }else{
            setSearchError(true);
        }
    }

    return (
            <form onSubmit={onSubmit} className="world-search-form">
                    <TextField 
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                            )
                        }}
                        name="name" 
                        onChange={onChange} 
                        value={searchTerm}
                        placeholder="Campaign title"
                        variant="outlined"
                    />
                <div className="world-search-failed">
                    {searchError ? <SearchErrorMessage /> : null}
                </div>
            </form>
    );
  };
  
  export default WorldSearchForm;