import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/posts";
import { fetchSinglePost, updatePost } from "../redux/singlePost";
import {  useParams  } from "react-router-dom";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";



export function SinglePost () {

    const dispatch = useDispatch();
    const post = useSelector((state) => state.post);

    const [updateForm, setUpdateForm] = useState(false);
    const [postContent, setPostContent] = useState(post.content);
    const [postType, setPostType] = useState(post.type);
    const [postTitle, setPostTitle] = useState(post.title);
    const [postImage, setPostImage] = useState(post.imageUrl);
    const [rerender, setRerender] = useState(false);

    let { postId } = useParams();
    let { worldId } = useParams();

    useEffect(()=>{
        console.log(rerender);
        console.log(post);
        dispatch(fetchSinglePost(postId))
        //setRerender(!rerender);
    }, [dispatch, postId, rerender]);

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

    const onSubmit = (event) => {
        event.preventDefault();
        const post = {
            content: postContent,
            type: postType,
            title: postTitle,
            imageUrl: postImage,
            UserId: 1,                 //needs to be changed to grab actual user ID
            WorldId: worldId,
            id: postId
        }
        console.log(post);
        dispatch(updatePost(post));
        setUpdateForm(false);
        setRerender(!rerender);
        console.log(rerender);
    }
    
    if(!updateForm){
        return(
            <div>
                <button className='edit'
                    onClick={() => setUpdateForm(true)}>
                        Edit
                </button>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <p>{post.type}</p>
                Comments:
                <Comments />
                <CommentForm />
            </div>
            )
        }else{
            return (
                <div>
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
                            <button type="submit">
                                Update
                            </button>
                        </div>
                
                    </form>
                    <Link to ={`/worlds/${worldId}`}>
                        <button className='remove'
                            onClick={() => dispatch(deletePost(post.id))}>
                                Delete Post
                        </button>
                    </Link>
                </div>
            )
        }

}

export default SinglePost;