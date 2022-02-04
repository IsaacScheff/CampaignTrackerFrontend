import Axios from "axios";

const SET_COMMENTS = 'SET_COMMENTS';
const CREATE_COMMENT = 'CREATE_COMMENT';


export const _createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment
});

export const setComments = (comments) => ({
  type: SET_COMMENTS,
  comments
});

export const createComment = (comment) => async(dispatch) => {
  try {
    const {data: created} = await Axios.post('http://localhost:1337/comments', comment);
    dispatch(_createComment(created));
  } catch (error) {
    console.log(error);
  }
}

export const fetchComments = (postid) => async (dispatch) => {
  try{
    const {data} = await Axios.get(`http://localhost:1337/comments/${postid}`);
    dispatch(setComments(data));
  }catch(error){
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
    default:
      return state;
  };
}