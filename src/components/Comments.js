import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, deleteComment } from "../redux/comments";
import {  useParams  } from "react-router-dom";

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
                 <div className='comment-text'>{comment.content}</div>
                  <button className='comment-delete'
                    onClick={() => dispatch(deleteComment(comment.id))}>X</button>
            </div>
            ))
        }
        </div>
    )
}

export default Comments;