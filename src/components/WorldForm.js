import React, { useState, useRef } from "react";
import cn from "classnames";
import { createWorld } from "../redux/worlds";
import { useDispatch, useSelector } from "react-redux";
import {  useParams  } from "react-router-dom";

const WorldForm = () => {

    const dispatch = useDispatch();
    const [worldDescription, setWorldDescription] = useState("");
    const [worldName, setWorldName] = useState("");
    const [worldImage, setWorldImage] = useState("");
  
    //const outerHeight = useRef(INITIAL_HEIGHT);
    const textRef = useRef(null);
    const containerRef = useRef(null);

    //let { worldId } = useParams();
  
    // const onExpand = () => {
	// 	if (!isExpanded) {
    //         outerHeight.current = containerRef.current.scrollHeight;
    //         setIsExpanded(true);
    //     }
	// }

    const onChange = (event) => {
        switch (event.target.name){
            case 'name':
                setWorldName(event.target.value);
                break;
            case 'description':
                setWorldDescription(event.target.value);
                break;
            // case 'imageUrl':
            //     setWorldImage(event.target.value);
            //     break;  
            default:
                console.log("onChange non selected value");
        }
    }

    const onClose = () => {
        setWorldName("");
        setWorldDescription("");
        //setIsExpanded(false);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const world = {
            name: worldName,
            description: worldDescription,
            //imageUrl: worldImage,
            UserId: 1,                 
        }
        dispatch(createWorld(world));
        onClose();
    }

    return (
        <form
            onSubmit={onSubmit}
        >

            <label htmlFor="name">Name</label>
            <input name="name" onChange={onChange} value={worldName}/>
            <p>
                <label htmlFor="description">Description</label>
                <input name="description" onChange={onChange} value={worldDescription}/>
            </p>
            {/* <p>
                <label htmlFor="imageUrl">ImageUrl</label>
                <input name="imageUrl" onChange={onChange} />
            </p> */}
            <div>
                <button type="submit" disabled={worldName.length < 1}>
                    Create!
                </button>
            </div>
	
	    </form>
    );
  };
  
  export default WorldForm;