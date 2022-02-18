import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleWorld, updateWorld } from "../redux/singleWorld";
import { deleteWorld } from "../redux/worlds";
import {  useParams, useNavigate  } from "react-router-dom";
import Posts from "./Posts";




export function SingleWorld () {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const world = useSelector((state) => state.world);
    
    let { worldId } = useParams();

    useEffect(()=>{
        dispatch(fetchSingleWorld(worldId));
        setWorldDescription(world.description);
        setWorldName(world.name);
        setWorldImage(world.imageUrl);
    }, [dispatch, worldId, world.description, world.name, world.imageUrl]);

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

    const onClick = () => {
        setWorldDescription(world.description);
        setUpdateForm(true);
    }

    const contentSizer = (element) => {
        element.target.style.height = "1px";
        element.target.style.width = "50%";
        element.target.style.height = (25 + element.target.scrollHeight) + "px";
    }

    const onDelConfirm = () => {
        dispatch(deleteWorld(world.id));
        navigate('/worlds');
    }

    const onDelCancel = () => {
        setUpdateForm(false);
    }

    if(!updateForm){
        return(
            <div className="single-world">
                <p className='campaign-title'>{world.name}</p>
                <img className="campaign-image" src={world.imageUrl}/>
                <p>Description: {world.description}</p>
                <button className='edit'
                    onClick={onClick}>
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
                        <input name="name" onChange={onChange} placeholder={world.name}/>
                        <p>
                            <label htmlFor="description">Overview</label>
                            <textarea name="description" onClick={contentSizer} onKeyUp={contentSizer} onChange={onChange} value={worldDescription}/>
                        </p>
                        <p>
                            <label htmlFor="imageUrl">ImageUrl</label>
                            <input name="imageUrl" onChange={onChange} placeholder="optional"/>
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
                    <button className='remove'
                        onClick={() => window.confirm('Are you sure you wish to Delete this campaign? This action is permanent.') ? onDelConfirm() : onDelCancel()}>
                            Delete Campaign
                    </button>
                </div>
            )
        }

}

export default SingleWorld;

