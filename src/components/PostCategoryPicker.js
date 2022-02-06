import React, { useEffect, useState } from "react";
import { fetchPostTypes } from "../redux/postTypes";
import { fetchPostsByType } from "../redux/posts";
import { useDispatch, useSelector } from "react-redux";
import {  useParams  } from "react-router-dom";

const PostCategoryPicker = () => {

    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);

    const [typeSelection, setTypeSelection] = useState("");
   
    let { worldId } = useParams();

    useEffect(()=>{
        dispatch(fetchPostTypes(worldId))
    }, [dispatch, worldId])

    const onClick = () => {
        dispatch(fetchPostsByType(worldId, typeSelection));
    };

    const onChange = (event) => {
        setTypeSelection(event.target.value);
    };
    
    if(types){
        return (
            <div>
                <select name="postTypeList" value={typeSelection} onChange={onChange}>
                    {
                        types.map((type, index) => (
                            <option value={`${type}`} key={index}>{`${type}`}</option>
                        ))
                    }
                </select>
                <button onClick={onClick}>
                    Select
                </button>
            </div>
        )
    }
  };
  
  export default PostCategoryPicker;