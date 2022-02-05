import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleWorld } from "../redux/singleWorld";
import { deleteWorld } from "../redux/worlds";
import {  useParams  } from "react-router-dom";
import Posts from "./Posts";
import { fetchPosts } from "../redux/posts";
import { Link } from "react-router-dom";
//import UpdateWorld from "./UpdateWorld";


export function SingleWorld () {
    
    const dispatch = useDispatch();
    const world = useSelector((state) => state.world);

    let { worldId } = useParams();

    useEffect(()=>{
        dispatch(fetchSingleWorld(worldId))
    }, [])
    return(
        <div>
            component loaded
            world {worldId}
            <p>Name: {world.name}</p>
            <img src={world.imageUrl}/>
            <p>Description: {world.description}</p>
            {/* See posts button? */}
            <Posts />
            <Link to ={`/worlds`}>
                <button className='remove'
                    onClick={() => dispatch(deleteWorld(world.id))}>
                        Delete Campaign
                </button>
            </Link>
        </div>
        )

}

export default SingleWorld;

