import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { fetchSingleWorld } from "../redux/singleWorld";
import {  useParams  } from "react-router-dom";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
//import { fetchPosts } from "../redux/posts";
//import UpdateWorld from "./UpdateWorld";


export function SinglePost () {
    
    return(
        <div>
            <Comments />
            <CommentForm />
        </div>
        )

}

export default SinglePost;