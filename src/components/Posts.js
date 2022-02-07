import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/posts";
import {  useParams  } from "react-router-dom";
import { Link } from "react-router-dom";
import PostForm from "./PostForm";
import PostCategoryPicker from "./PostCategoryPicker";


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
            <PostCategoryPicker />
            <div className='post-container'>
        {
            posts.map(post => (
             <div className='post' key={post.id}>
                <h3 className='post-title'>{post.title}</h3>
                <p className='post-type'>{post.type}</p>
                <p>{post.content}</p>
                <p>
                    <Link to={`/${worldId}/posts/${post.id}`}>
                        Discuss post
                    </Link>
                </p>
            </div>
            ))
        }   
            </div>
            <button type="show-post-form" onClick={onClick}>
                Create New Post!
            </button>
        </div>
    )
    }else{
        return(
            <div>
                <PostForm formSubmit={setNewPost}/>
                <button type="reset" onClick={onClick}>
                Cancel
                </button>
            </div>
        )
    }
}

export default Posts;

