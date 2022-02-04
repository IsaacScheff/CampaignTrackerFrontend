import Axios from "axios";

const SET_POSTS = 'SET_POSTS';
const CREATE_POST = 'CREATE_POST';


export const _createPost = (post) => ({
  type: CREATE_POST,
  post
});

export const setPosts = (posts) => ({
  type: SET_POSTS,
  posts
});

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
    const {data} = await Axios.get(`http://localhost:1337/posts/${worldid}`);
    dispatch(setPosts(data));
  }catch(error){
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
    default:
      return state;
  };
}