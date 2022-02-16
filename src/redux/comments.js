import Axios from "axios";

//const api = 'http://localhost:1337'
const api = 'https://api.campaigntracker.org'

const SET_COMMENTS = 'SET_COMMENTS';
const CREATE_COMMENT = 'CREATE_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';


export const _createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment
});

export const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments
});

export const _deleteComment = (comment) => ({
  type: DELETE_COMMENT,
  comment
});

export const createComment = (comment) => async(dispatch) => {
  try {
    const {data: created} = await Axios.post(`${api}/comments`, comment);
    dispatch(_createComment(created));
  } catch (error) {
    console.log(error);
  }
}

export const fetchComments = (postid) => async (dispatch) => {
  try{
    const {data} = await Axios.get(`${api}/comments/${postid}`);
    dispatch(setComments(data));
  }catch(error){
    console.log(error); 
  }
}

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    const {data: comment} = await Axios.delete(`${api}/comments/${commentId}`);
    dispatch(_deleteComment(comment));
  } catch (error) {
    console.log(error);
  }
}


const initialState = []

export default function commentsReducer(state = initialState, action) {
  switch(action.type){
    case SET_COMMENTS:
      return action.comments;
    case CREATE_COMMENT:
      return [...state, action.comment];
    case DELETE_COMMENT:
      return state.filter((comment) => comment.id !== action.comment.id);
    default:
      return state;
  };
}