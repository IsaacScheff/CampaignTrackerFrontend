import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/posts";
import {  useParams  } from "react-router-dom";
import { Link } from "react-router-dom";
//import UpdateWorld from "./UpdateWorld";


export function Posts () {
    
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);

    let { worldId } = useParams();

    useEffect(()=>{
        dispatch(fetchPosts(worldId))
    }, [])
    
    return (
        <div id='posts' className='column'>
        {
            posts.map(post => (
             <div className='post' key={post.id}>
                <Link to={`/${worldId}/posts/${post.id}`}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                </Link>
                <p>{post.type}</p>
                <hr />
            </div>
            ))
        }
        </div>
    )
}

export default Posts;

