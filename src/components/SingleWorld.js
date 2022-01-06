import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleWorld } from "../redux/singleWorld";
import {  useParams  } from "react-router-dom";
//import UpdateWorld from "./UpdateWorld";


export function SingleWorld () {
    
    const dispatch = useDispatch();
    const world = useSelector((state) => state.world);

    let { worldId } = useParams();

    useEffect(()=>{
        console.log('component mounted');
        dispatch(fetchSingleWorld(worldId))
    }, [])
    return(
        <div>
            component loaded
            world {worldId}
            <p>Name: {world.Name}</p>
            <img src={world.imageUrl}/>
            <p>Description: {world.description}</p>
        </div>
        )

}

export default SingleWorld;

