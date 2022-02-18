import React, { useState, useRef } from "react";
import cn from "classnames";
import { createComment } from "../redux/comments";
import { useDispatch } from "react-redux";
import {  useParams  } from "react-router-dom";
import heightField from "./heightField";

const INITIAL_HEIGHT = 46;

const CommentForm = () => {

    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);
    const [commentValue, setCommentValue] = useState("");
  
    const outerHeight = useRef(INITIAL_HEIGHT);
    const textRef = useRef(null);
    const containerRef = useRef(null);

    heightField(textRef, commentValue);

    let { postId } = useParams();
  
    const onExpand = () => {
		if (!isExpanded) {
            outerHeight.current = containerRef.current.scrollHeight;
            setIsExpanded(true);
        }
	}

    const onChange = (event) => {
        setCommentValue(event.target.value);
    }

    const onClose = () => {
        setCommentValue("");
        setIsExpanded(false);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const comment = {
            content: commentValue,
            UserId: 1,               
            PostId: postId
        }
        console.log(comment);
        dispatch(createComment(comment));
        onClose();
    }

    return (
        <form
            onSubmit={onSubmit}
            ref={containerRef}
            className={cn("comment-box", {
                expanded: isExpanded,
                collapsed: !isExpanded,
			    modified: commentValue.length > 0,
            })}
            style={{
                minHeight: isExpanded ? outerHeight.current : INITIAL_HEIGHT
            }}
        >

            <label htmlFor="comment">Comment?</label>
            <textarea
                ref={textRef}
                onClick={onExpand}
                onFocus={onExpand}
                onChange={onChange}
                className="comment-field"
                placeholder="Comment?"
                value={commentValue}
                name="comment"
                id="comment"
            />
            <div className="actions">
                <button type="button" className="cancel" onClick={onClose}>
                    Cancel
                </button>
                <button type="submit" disabled={commentValue.length < 1}>
                    Respond
                </button>
            </div>
	
	    </form>
    );
  };
  
  export default CommentForm;
