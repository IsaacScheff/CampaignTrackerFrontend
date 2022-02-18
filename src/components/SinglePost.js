import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/posts";
import { fetchSinglePost, updatePost } from "../redux/singlePost";
import {  useParams, useNavigate  } from "react-router-dom";
import Comments from "./Comments";
import CommentForm from "./CommentForm";


export function SinglePost () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.post);

    const [updateForm, setUpdateForm] = useState(false);
    const [postContent, setPostContent] = useState(post.content);
    const [postType, setPostType] = useState(post.type);
    const [postTitle, setPostTitle] = useState(post.title);
    const [postImage, setPostImage] = useState(post.imageUrl);
  

    let { postId } = useParams();
    let { worldId } = useParams();

    useEffect(()=>{
        dispatch(fetchSinglePost(postId));
        setPostContent(post.content);
        setPostTitle(post.title);
        setPostType(post.type);
        setPostImage(post.imageUrl);
    }, [dispatch, postId, post.content, post.type, post.title, post.imageUrl]);

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
            UserId: 1,                 
            WorldId: worldId,
            id: postId
        }
        dispatch(updatePost(post));
        setUpdateForm(false);
    }

    const onCancel = () => {
        setUpdateForm(false);
    }

    const onClick = () => {
        setPostContent(post.content);
        setUpdateForm(true);
    }

    const contentSizer = (element) => {
        element.target.style.height = "1px";
        element.target.style.width = "50%";
        element.target.style.height = (25 + element.target.scrollHeight) + "px";
    }

    const onDelConfirm = () => {
        dispatch(deletePost(post.id));
        navigate(`/worlds/${worldId}`);
    }

    const onDelCancel = () => {
        setUpdateForm(false);
    }
    
    if(!updateForm){
        return(
            <div className="single-post">
                 <button className='edit'
                    onClick={onClick}>
                        Edit Post
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
                <div className="single-post">
                    <form
                        onSubmit={onSubmit}
                    >

                        <label htmlFor="title">Title</label>
                        <input name="title" onChange={onChange} placeholder={post.title}/>
                        <p>
                            <label htmlFor="content">Content</label>
                            <textarea name="content" onClick={contentSizer} onKeyUp={contentSizer} onChange={onChange} value={postContent}/>
                        </p>
                        <p>
                            <label htmlFor="type">Category</label>
                            <input name="type" onChange={onChange} placeholder={post.type}/>
                        </p>
                        <p>
                            <label htmlFor="imageUrl">ImageUrl</label>
                            <input name="imageUrl" onChange={onChange} placeholder="optional"/>
                        </p>
                        <div>
                            <button type="submit">
                                Update
                            </button>
                            <button type="reset" onClick={onCancel}>
                                Cancel
                            </button>
                        </div>
                
                    </form>
                    <button className='remove'
                        onClick={() => window.confirm('Are you sure you wish to Delete this post? This action is permanent.') ? onDelConfirm() : onDelCancel()}>
                            Delete Post
                    </button>
                </div>
            )
        }

}

export default SinglePost;