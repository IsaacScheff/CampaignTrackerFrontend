import React, { useEffect, useState } from "react";
import { fetchPostTypes } from "../redux/postTypes";
import { fetchPostsByType, fetchPosts } from "../redux/posts";
import { useDispatch, useSelector } from "react-redux";
import {  useParams  } from "react-router-dom";

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
        }else {
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
                    <button onClick={allPosts}>
                        See All Posts
                    </button>
                </div>
            )

        }
    }
  };
  
  export default PostCategoryPicker;