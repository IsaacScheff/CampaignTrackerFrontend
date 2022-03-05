import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/posts";
import { fetchSinglePost, updatePost } from "../redux/singlePost";
import {  useParams, useNavigate  } from "react-router-dom";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { ButtonGroup, Button, TextField, Paper } from "@mui/material";
import SaveIcon  from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';


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
            <div>
                <Paper 
                    className="single-post"
                    sx = {{
                        width: "50%",
                        margin: "auto",
                        marginTop: "50px",
                        backgroundColor: "#f0bf7a"

                }}>
                    <Button 
                        color="warning"
                        className='edit'
                        variant="contained"
                        onClick={onClick}
                        sx={{
                            marginBottom: "10px",
                            float: "right"
                        }}>
                            Edit 
                    </Button>
                    <h3 className="post-header">
                        {post.title}
                        <div className='post-type'>{post.type}</div>
                    </h3>
                    <p className="post-content">{post.content}</p>
                </Paper>
                    <Comments />
                    <CommentForm />
            </div>
            )
        }else{
            return (
                <Paper 
                    className="single-post"
                    sx={{
                        width: "50%",
                        margin: "auto",
                        marginTop: "50px",
                        backgroundColor: "#f0bf7a"
                    }}
                >
                    <form
                        onSubmit={onSubmit}
                    >
                        <h1>
                            Edit Post
                        </h1>
                        <TextField label="Title" name="title" onChange={onChange} placeholder={post.title}/>
                        <p>
                            <textarea name="content" onClick={contentSizer} onKeyUp={contentSizer} onChange={onChange} value={postContent}/>
                        </p>
                        <p>
                            <TextField label="Category" name="type" onChange={onChange} placeholder={post.type}/>
                        </p>
                        <TextField label="ImageURL" name="imageUrl" onChange={onChange} placeholder="optional"/>
                        <div>
                            <ButtonGroup variant="contained" sx={{margin: "10px"}}> 
                                <Button startIcon={<SaveIcon />} type="submit">
                                    Update
                                </Button>
                                <Button startIcon={<CancelIcon />} color="secondary" type="reset" onClick={onCancel}>
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </div>
                    </form>
                    <h4>
                        or
                    </h4>
                    <Button startIcon={<DeleteIcon />} variant="contained" color="warning" className='remove' sx={{marginBottom: "10px"}}
                        onClick={() => window.confirm('Are you sure you wish to Delete this post? This action is permanent.') ? onDelConfirm() : onDelCancel()}>
                            Delete Post
                    </Button>
                </Paper>
            )
        }

}

export default SinglePost;