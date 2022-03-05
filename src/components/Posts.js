import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/posts";
import {  useParams  } from "react-router-dom";
import { Link } from "react-router-dom";
import PostForm from "./PostForm";
import PostCategoryPicker from "./PostCategoryPicker";
import { ButtonGroup, Button, TextField, Paper } from "@mui/material";


export function Posts () {
    
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);

    const [newPost, setNewPost] = useState(false);

    let { worldId } = useParams();

    useEffect(()=>{
        dispatch(fetchPosts(worldId))
    }, [dispatch, worldId])

    const onClick = () => {
        setNewPost(!newPost);
    };

    
    if(!newPost){
    return (
        <div id='posts'> 
            <Button 
                type="show-post-form" 
                onClick={onClick}
                variant="contained"
                sx={{
                    margin: "10px"
                }}
            >
                Create New Post!
            </Button>
            <PostCategoryPicker />
            <div className='post-container'>
        {
            posts.map(post => (
                
             <div className='post' key={post.id}>
                <h3>
                    <div className='post-title'>{post.title}</div>
                    <div className='post-type'>{post.type}</div>
                </h3>
                <p>{post.content}</p>
                <p>
                    <Link to={`/${worldId}/posts/${post.id}`}>
                        Comments: {post.Comments.length}
                    </Link>
                </p>
            </div>
            ))
        }   
            </div>
        </div>
    )
    }else{
        return(
            <div>
                <PostForm formSubmit={setNewPost}/>
            </div>
        )
    }
}

export default Posts;

