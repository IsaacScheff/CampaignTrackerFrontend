import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/posts";
import {  useParams  } from "react-router-dom";
import { Link } from "react-router-dom";
import PostForm from "./PostForm";
//import UpdateWorld from "./UpdateWorld";


export function Posts () {
    
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);

    const [newPost, setNewPost] = useState(false);

    let { worldId } = useParams();

    useEffect(()=>{
        dispatch(fetchPosts(worldId))
    }, [])

    const onClick = () => {
        setNewPost(!newPost);
    };
    
    if(!newPost){
    return (
        <div id='posts' className='column'>
        {
            posts.map(post => (
             <div className='post' key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <Link to={`/${worldId}/posts/${post.id}`}>
                    discussion
                </Link>
                <p>{post.type}</p>
                <hr />
            </div>
            ))
        }   
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

