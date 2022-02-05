import React, { useState, useRef } from "react";
import cn from "classnames";
import { createPost } from "../redux/posts";
import { useDispatch, useSelector } from "react-redux";
import {  useParams  } from "react-router-dom";

const PostForm = () => {

    const dispatch = useDispatch();
    const [postContent, setPostContent] = useState("");
    const [postType, setPostType] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postImage, setPostImage] = useState("");
  
    //const outerHeight = useRef(INITIAL_HEIGHT);
    const textRef = useRef(null);
    const containerRef = useRef(null);

    let { worldId } = useParams();
  
    // const onExpand = () => {
	// 	if (!isExpanded) {
    //         outerHeight.current = containerRef.current.scrollHeight;
    //         setIsExpanded(true);
    //     }
	// }

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

    // const onClose = () => {
    //     setCommentValue("");
    //     setIsExpanded(false);
    // };

    const onSubmit = (event) => {
        event.preventDefault();
        const post = {
            content: postContent,
            type: postType,
            title: postTitle,
            imageUrl: postImage,
            UserId: 1,                 //needs to be changed to grab actual user ID
            WorldId: worldId,
        }
        console.log(post);
        dispatch(createPost(post));
    }

    return (
        <form
            onSubmit={onSubmit}
        >

            <label htmlFor="title">Title</label>
            <input name="title" onChange={onChange} />
            <p>
                <label htmlFor="content">Content</label>
                <input name="content" onChange={onChange} />
            </p>
            <p>
                <label htmlFor="type">Category</label>
                <input name="type" onChange={onChange} />
            </p>
            <p>
                <label htmlFor="imageUrl">ImageUrl</label>
                <input name="imageUrl" onChange={onChange} />
            </p>
            <div className="actions">
                <button type="submit" disabled={postTitle.length < 1 || postContent.length < 1 || postType.length < 1}>
                    Post!
                </button>
            </div>
	
	    </form>
    );
  };
  
  export default PostForm;
