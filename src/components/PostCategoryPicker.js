import React, { useEffect, useState } from "react";
import { fetchPostTypes } from "../redux/postTypes";
import { fetchPostsByType, fetchPosts } from "../redux/posts";
import { useDispatch, useSelector } from "react-redux";
import {  useParams  } from "react-router-dom";
import { FormControl, Select, InputLabel, MenuItem, Box, Button } from "@mui/material";

const PostCategoryPicker = () => {

    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);

    const [typeSelection, setTypeSelection] = useState("");
    const [seeAll, setSeeAll] = useState(true);
   
    let { worldId } = useParams();

    useEffect(()=>{
        dispatch(fetchPostTypes(worldId))
    }, [dispatch, worldId])

    const onClick = () => {
        dispatch(fetchPostsByType(worldId, typeSelection));
        setSeeAll(false);
    };

    const onChange = (event) => {
        setTypeSelection(event.target.value);
    };

    const allPosts = (event) => {
        dispatch(fetchPosts(worldId));
        setSeeAll(true);
    };
    
    if(types){
        if(seeAll){
            return (
                <div>
                    <Box sx={{
                        width: "30%",
                        margin: "auto",
                        marginTop: "10px",
                        marginBottom: "10px"
                        }}>
                        <FormControl fullWidth>
                            <InputLabel>Filter posts by type</InputLabel>
                            <Select
                                value={typeSelection}
                                label="Filter posts by type"
                                onChange={onChange}
                            >
                                {types.map((type, index) => (
                                        <MenuItem value={`${type}`} key={index}>{`${type}`}</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                        <Button onClick={onClick} variant="contained" color="success" sx={{marginTop: "5px"}}>
                            Apply Filter
                        </Button>
                    </Box>
                </div>
            )
        }else{
            return (
                <div>
                     <Box sx={{
                        width: "30%",
                        margin: "auto",
                        marginTop: "10px",
                        marginBottom: "10px"
                        }}>
                        <FormControl fullWidth>
                            <InputLabel>Filter posts by type</InputLabel>
                            <Select
                                value={typeSelection}
                                label="Filter posts by type"
                                onChange={onChange}
                            >
                                {types.map((type, index) => (
                                        <MenuItem value={`${type}`} key={index}>{`${type}`}</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                        <Button onClick={onClick} variant="contained" color="success" sx={{marginTop: "5px"}}>
                            Apply Filter
                        </Button>
                    </Box>
                    <Button onClick={allPosts} variant="contained" color="secondary" sx={{marginBottom: "10px"}}>
                        See All Posts
                    </Button>
                </div>
            )

        }
    }
  };
  
  export default PostCategoryPicker;