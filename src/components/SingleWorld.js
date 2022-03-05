import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleWorld, updateWorld } from "../redux/singleWorld";
import { deleteWorld } from "../redux/worlds";
import {  useParams, useNavigate  } from "react-router-dom";
import Posts from "./Posts";
import { ButtonGroup, Button, TextField, Paper } from "@mui/material";
import SaveIcon  from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';




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
            <div>
                <Paper sx={{
                    width: "75%",
                    margin: "auto",
                    marginTop: "10px",
                    backgroundColor: "#8a6d45",
                    paddingBottom: "10px"
                }}>
                    <Button 
                        variant="contained"
                        color="warning"
                        className='edit'
                        onClick={onClick}
                        sx={{
                            marginBottom: "10px",
                            float: "right"
                        }}>
                            Edit
                    </Button>
                    <p className='campaign-title'>{world.name}</p>
                    <img className="campaign-image" src={world.imageUrl}/>
                    <p>{world.description}</p>
                    </Paper>
                <Posts />
            </div>
            )
        }else{
            return (
                <Paper 
                    className="single-world"
                    sx={{
                        width: "50%",
                        margin: "auto",
                        marginTop: "50px",
                        backgroundColor: "#f0bf7a"
                    }}
                >
                    <form
                        onSubmit={onSubmit}
                    >
                        <h1>
                            Edit Campaign
                        </h1>
                        <TextField label="Name" variant="outlined" name="name" onChange={onChange} placeholder={world.name}/>
                        <p>
                            <textarea name="description" onClick={contentSizer} onKeyUp={contentSizer} onChange={onChange} value={worldDescription}/>
                        </p>
                        <TextField label="ImageUrl" variant="outlined" onChange={onChange} placeholder="optional"/>
                        <div>
                            <ButtonGroup variant="contained" sx={{margin: "10px"}}>
                                <Button startIcon={<SaveIcon />}  type="submit">
                                    Update
                                </Button>
                                <Button startIcon={<CancelIcon />} color="secondary" type="reset" onClick={onCancel}>
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </div>
                    </form>
                    <h4>
                        or
                    </h4>
                    <Button startIcon={<DeleteIcon />} variant="contained" color="warning" className='remove' sx={{marginBottom: "10px"}}
                        onClick={() => window.confirm('Are you sure you wish to Delete this campaign? This action is permanent.') ? onDelConfirm() : onDelCancel()}>
                            Delete Campaign
                    </Button>
                </Paper>
            )
        }

}

export default SingleWorld;

