import Axios from 'axios';

//const api = 'http://localhost:1337'
const api = 'https://api.campaigntracker.org'

const SET_SINGLE_WORLD = 'SET_SINGLE_WORLD';
const UPDATE_WORLD = 'UPDATE_WORLD';

export const setSingleWorld = (world) => ({
    type: SET_SINGLE_WORLD,
    world
});

export const _updateWorld = (world) => ({
    type: UPDATE_WORLD,
    world
});

export const fetchSingleWorld = (id) => {
    return async (dispatch) => {
        try { 
            const {data} = await Axios.get(`${api}/worlds/${id}`);
            dispatch(setSingleWorld(data));
        } catch (error) {
            console.log(error);
        }
    }
}

export const updateWorld = (world) => async(dispatch) => {
    try {
      const {data: updated} = await Axios.put(`${api}/worlds/${world.id}`, world);
      dispatch(_updateWorld(updated));
    } catch (error) {
      console.log(error);
    }
  }

const initialState = {};

export default function singleWorldReducer(state = initialState, action) {
    switch(action.type){
        case SET_SINGLE_WORLD:
            return action.world;
        case UPDATE_WORLD:
            return action.world;
        default:
            return state;
    };
}