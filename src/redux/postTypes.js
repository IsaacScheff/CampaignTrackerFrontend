import Axios from "axios";

//const api = 'http://localhost:1337'
const api = 'https://api.campaigntracker.org'

const SET_POST_TYPES = 'SET_POST_TYPES';

export const setPostTypes = (types) => ({
  type: SET_POST_TYPES,
  types
});

export const fetchPostTypes = (worldId) => {
  return async (dispatch) => {
    try {
      const {data} = await Axios.get(`${api}/posts/types/${worldId}`);
      dispatch(setPostTypes(data));
    } catch (error) {
        console.log(error);
    }
  }
}

const initialState = []

export default function postTypesReducer(state = initialState, action) {
  switch(action.type){
    case SET_POST_TYPES:
      return action.types;
    default:
      return state;
  };
}