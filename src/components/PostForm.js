import React, { useState } from "react";
import { createPost } from "../redux/posts";
import { useDispatch } from "react-redux";
import {  useParams  } from "react-router-dom";

const PostForm = () => {

    const dispatch = useDispatch();
    const [postContent, setPostContent] = useState("");
    const [postType, setPostType] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postImage, setPostImage] = useState("");

    let { worldId } = useParams();

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
            type: postType,
            title: postTitle,
            imageUrl: postImage,
            UserId: 1,              
            WorldId: worldId,
        }
        dispatch(createPost(post));
        onClose();
    }

    return (
        <form
            onSubmit={onSubmit}
        >

            <label htmlFor="title">Title</label>
            <input name="title" onChange={onChange} value={postTitle}/>
            <p>
                <label htmlFor="content">Content</label>
                <input name="content" onChange={onChange} value={postContent}/>
            </p>
            <p>
                <label htmlFor="type">Category</label>
                <input name="type" onChange={onChange} value={postType}/>
            </p>
            <p>
                <label htmlFor="imageUrl">ImageUrl</label>
                <input name="imageUrl" onChange={onChange} value={postImage}/>
            </p>
            <div>
                <button type="submit" disabled={postTitle.length < 1 || postContent.length < 1 || postType.length < 1}>
                    Post!
                </button>
            </div>
	
	    </form>
    );
  };
  
  export default PostForm;
