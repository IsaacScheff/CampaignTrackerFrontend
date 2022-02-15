import Axios from "axios";

const SET_POSTS = 'SET_POSTS';
const SET_POSTS_BY_TYPE= 'SET_POSTS_BY_TYPE';
const CREATE_POST = 'CREATE_POST';
const DELETE_POST = 'DELETE_POST';
const UPDATE_POST = 'UPDATE_POST';

export const setPostsByType = (posts) => ({
  type: SET_POSTS_BY_TYPE,
  posts
});

export const _createPost = (post) => ({
  type: CREATE_POST,
  post
});

export const setPosts = (posts) => ({
  type: SET_POSTS,
  posts
});

export const _deletePost = (post) => ({
  type: DELETE_POST,
  post
});

export const _updatePost = (post) => ({
  type: UPDATE_POST,
  post
});

export const fetchPostsByType = (worldId, type) => async (dispatch) => {
  try {
    const {data} = await Axios.get(`http://localhost:1337/posts/bytype/${worldId}/${type}`);
    dispatch(setPostsByType(data));
  } catch (error) {
    console.log(error);
  }
}

export const createPost = (post) => async(dispatch) => {
  try {
    const {data: created} = await Axios.post('http://localhost:1337/posts', post);
    dispatch(_createPost(created));
  } catch (error) {
    console.log(error);
  }
}

export const fetchPosts = (worldid) => async (dispatch) => {
  try{
    // const {data} = await Axios.get(`http://localhost:1337/posts/${worldid}`);
    const {data} = await Axios.get(`http://api.campaigntracker.org/posts/${worldid}`);
    dispatch(setPosts(data));
  }catch(error){
    console.log(error); 
  }
}

export const deletePost = (postId) => async (dispatch) => {
  try {
    const {data: post} = await Axios.delete(`http://localhost:1337/posts/${postId}`);
    dispatch(_deletePost(post));
  } catch (error) {
    console.log(error);
  }
}

export const updatePost = (post) => async(dispatch) => {
  try {
    const {data: updated} = await Axios.put(`http://localhost:1337/posts/${post.id}`, post);
    dispatch(_updatePost(updated));
  } catch (error) {
    console.log(error);
  }
}


const initialState = []

export default function postsReducer(state = initialState, action) {
  switch(action.type){
    case SET_POSTS:
      return action.posts;
    case CREATE_POST:
      return [...state, action.post];
    case DELETE_POST:
      return state.filter((post) => post.id !== action.post.id);
    case SET_POSTS_BY_TYPE:
      return action.posts;
    default:
      return state;
  };
}