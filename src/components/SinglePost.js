import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/posts";
import { fetchSinglePost } from "../redux/singlePost";
import {  useParams  } from "react-router-dom";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";



export function SinglePost () {

    const dispatch = useDispatch();
    const post = useSelector((state) => state.post);

    let { postId } = useParams();
    let { worldId } = useParams();

    useEffect(()=>{
        dispatch(fetchSinglePost(postId))
    }, [])
    
    console.log(worldId);
    return(
        <div>
            <Link to ={`/worlds/${worldId}`}>
                <button className='remove'
                    onClick={() => dispatch(deletePost(post.id))}>
                        Delete
                </button>
            </Link>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>{post.type}</p>
            Comments:
            <Comments />
            <CommentForm />
        </div>
        )

}

export default SinglePost;