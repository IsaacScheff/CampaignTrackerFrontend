import Axios from "axios";
import api from "../dev";

const SET_SINGLE_POSTS = 'SET_SINGLE_POSTS';
const UPDATE_POST = 'UPDATE_POST';

export const setSinglePost = (post) => ({
  type: SET_SINGLE_POSTS,
  post
});

export const _updatePost = (post) => ({
  type: UPDATE_POST,
  post
});

export const fetchSinglePost = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await Axios.get(`${api}/posts/singlepost/${id}`);
      dispatch(setSinglePost(data));
    } catch (error) {
        console.log(error);
    }
  }
}

export const updatePost = (post) => async(dispatch) => {
  try {
    const {data: updated} = await Axios.put(`${api}/posts/${post.id}`, post);
    dispatch(_updatePost(updated));
  } catch (error) {
    console.log(error);
  }
}

const initialState = []

export default function singlePostReducer(state = initialState, action) {
  switch(action.type){
    case SET_SINGLE_POSTS:
      return action.post;
    case UPDATE_POST:
      return action.post;
    default:
      return state;
  };
}