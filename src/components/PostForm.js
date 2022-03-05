import React, { useEffect, useState } from "react";
import { createPost } from "../redux/posts";
import { useDispatch } from "react-redux";
import {  useParams  } from "react-router-dom";
import { fetchPostTypes } from "../redux/postTypes";
import { ButtonGroup, Button, TextField, Paper } from "@mui/material";

const PostForm = ({formSubmit}) => {

    const dispatch = useDispatch();
    const [postContent, setPostContent] = useState("");
    const [postType, setPostType] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postImage, setPostImage] = useState("");

    let { worldId } = useParams();

    useEffect(()=>{
        dispatch(fetchPostTypes(worldId));
    }, [dispatch, worldId])

    const onChange = (event) => {
        switch (event.target.name){
            case 'content':
                setPostContent(event.target.value);
                break;
            case 'title':
                setPostTitle(event.target.value);
                break;
            case 'type':
                setPostType(event.target.value);
                break;
            case 'imageUrl':
                setPostImage(event.target.value);
                break;  
            default:
                console.log("onChange non selected value");
        }
    }

    const onClose = () => {
        setPostType("");
        setPostTitle("");
        setPostImage("");
        setPostContent("");
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const post = {
            content: postContent,
            type: postType.replaceAll(' ', '_'),
            title: postTitle,
            imageUrl: postImage,
            UserId: 1,              
            WorldId: worldId,
        }
        //console.log(post);
        dispatch(createPost(post));
        dispatch(fetchPostTypes(worldId));
        onClose();
        formSubmit(false);
    }

    const contentSizer = (element) => {
        element.target.style.height = "1px";
        element.target.style.width = "50%";
        element.target.style.height = (25 + element.target.scrollHeight) + "px";
    }

    return (
        <Paper sx={{
            width: "50%",
            margin: "auto",
            backgroundColor: "#f0bf7a"
        }}>
            <form
                onSubmit={onSubmit}
            >

                <h1>
                    Create New Post
                </h1>
                <TextField label="Title" name="title" onChange={onChange} value={postTitle}/>
                <p>
                    <textarea 
                        name="content" 
                        onClick={contentSizer} 
                        onKeyUp={contentSizer} 
                        onChange={onChange} 
                        value={postContent}
                        placeholder="Content"
                    />
                </p>
                <p>
                    <TextField label="Category" name="type" onChange={onChange} value={postType}/>
                </p>
                    <TextField label="ImageURL" name="imageUrl" onChange={onChange} value={postImage} placeholder='optional'/>
                <div>
                    <ButtonGroup>
                        <Button 
                            variant="contained"
                            type="submit" 
                            disabled={postTitle.length < 1 || postContent.length < 1 || postType.length < 1}
                            sx={{marginTop: "10px", marginBottom: "10px"}}
                        >
                            Post!
                        </Button>
                        <Button 
                            onClick={() => formSubmit(false)}
                            variant="contained"
                            color="secondary"
                            sx={{marginTop: "10px", marginBottom: "10px"}}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </div>
            </form>
        </Paper>
    );
  };
  
  export default PostForm;
