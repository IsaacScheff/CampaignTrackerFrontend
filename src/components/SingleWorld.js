import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleWorld, updateWorld } from "../redux/singleWorld";
import { deleteWorld } from "../redux/worlds";
import {  useParams  } from "react-router-dom";
import Posts from "./Posts";
import { Link } from "react-router-dom";



export function SingleWorld () {
    
    const dispatch = useDispatch();
    const world = useSelector((state) => state.world);
    
    let { worldId } = useParams();

    useEffect(()=>{
        dispatch(fetchSingleWorld(worldId))
    }, [dispatch, worldId])

    const [updateForm, setUpdateForm] = useState(false);
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

    const onSubmit = (event) => {
        event.preventDefault();
        const world = {
            id: worldId,
            UserId: 1       
        }
        if(worldName)
            world.name = worldName;
        if(worldDescription)
            world.description = worldDescription;
        if(worldImage)
            world.imageUrl = worldImage;

        dispatch(updateWorld(world));
        setUpdateForm(false);
    }

    const onCancel = () => {
        setUpdateForm(false);
    }

    if(!updateForm){
        return(
            <div className="single-world">
                <p className='campaign-title'>{world.name}</p>
                <img className="campaign-image" src={world.imageUrl}/>
                <p>Description: {world.description}</p>
                <button className='edit'
                    onClick={() => setUpdateForm(true)}>
                        Edit Campaign
                </button>
                <Posts />
            </div>
            )
        }else{
            return (
                <div className="single-world">
                    <form
                        onSubmit={onSubmit}
                    >

                        <label htmlFor="name">Name</label>
                        <input name="name" onChange={onChange} />
                        <p>
                            <label htmlFor="description">Overview</label>
                            <input name="description" onChange={onChange} />
                        </p>
                        <p>
                            <label htmlFor="imageUrl">ImageUrl</label>
                            <input name="imageUrl" onChange={onChange} />
                        </p>
                        <div>
                            <button type="submit">
                                Update
                            </button>
                            <button type="reset" onClick={onCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                    <Link to ={`/worlds`}>
                        <button className='remove'
                            onClick={() => dispatch(deleteWorld(world.id))}>
                                Delete Campaign
                        </button>
                    </Link>
                </div>
            )
        }

}

export default SingleWorld;

