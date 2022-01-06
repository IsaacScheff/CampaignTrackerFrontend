import Axios from 'axios';

const SET_SINGLE_WORLD = 'SET_SINGLE_WORLD';

export const setSingleWorld = (world) => ({
    type: SET_SINGLE_WORLD,
    world
});

export const fetchSingleWorld = (id) => {
    return async (dispatch) => {
        try { 
            const {data} = await Axios.get(`http://localhost:1337/worlds/${id}`);
            dispatch(setSingleWorld(data));
        } catch (error) {
            console.log(error);
        }
    }
}

const initialState = {};

export default function singleWorldReducer(state = initialState, action) {
    switch(action.type){
        case SET_SINGLE_WORLD:
            return action.world;
        default:
            return state;
    };
}