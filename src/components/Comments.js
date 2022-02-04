import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, deleteComment } from "../redux/comments";
import {  useParams  } from "react-router-dom";
//import UpdateWorld from "./UpdateWorld";


export function Comments () {
    
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.comments);

    let { postId } = useParams();

    useEffect(()=>{
        dispatch(fetchComments(postId))
    }, [])

    return (
        <div id='comments' className='column'>
        {
            posts.map(comment => (
             <div className='comment' key={comment.id}>
                  <button className='remove'
                    onClick={() => dispatch(deleteComment(comment.id))}>X</button>
                <p>{comment.content}</p>
            </div>
            ))
        }
        </div>
    )
}

export default Comments;