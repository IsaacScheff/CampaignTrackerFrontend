import Axios from "axios";


const SET_SINGLE_POSTS = 'SET_SINGLE_POSTS';

export const setSinglePost = (post) => ({
  type: SET_SINGLE_POSTS,
  post
});

export const fetchSinglePost = (id) => {
  console.log(id);
  return async (dispatch) => {
    try {
      const {data} = await Axios.get(`http://localhost:1337/posts/singlepost/${id}`);
      dispatch(setSinglePost(data));
    } catch (error) {
        console.log(error);
    }
  }
}

const initialState = []

export default function singlePostReducer(state = initialState, action) {
  switch(action.type){
    case SET_SINGLE_POSTS:
      return action.post;
    default:
      return state;
  };
}