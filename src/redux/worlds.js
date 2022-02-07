import Axios from "axios";

const SET_WORLDS = 'SET_WORLDS';
const CREATE_WORLD = 'CREATE_WORLD';
const DELETE_WORLD = 'DELETE_WORLD';
const CREATE_WORLD_ERROR = 'CREATE_WORLD_ERROR';
const CLEAR_WORLD_ERROR = 'CLEAR_WORLD_ERROR';


export const _createWorld = (world) => ({
  type: CREATE_WORLD,
  world
});

export const setWorlds = (worlds) => ({
  type: SET_WORLDS,
  worlds
});

export const _deleteWorld = (world) => ({
  type: DELETE_WORLD,
  world
});

export const setWorldError = (error) => ({
  type: CREATE_WORLD_ERROR,
  error
});

export const _clearWorldError = () => ({
  type: CLEAR_WORLD_ERROR
});

export const clearWorldError = () => dispatch => {
  dispatch(_clearWorldError());
}

export const createWorld = (world) => async(dispatch) => {
  try {
    const {data: created} = await Axios.post('http://localhost:1337/worlds', world);
    if(created.errors)
      dispatch(setWorldError(created.errors[0].message));
    else
      dispatch(_createWorld(created));
  } catch (error) {
    console.log(error);
  }
}

export const fetchWorlds = () => async (dispatch) => {
  try{
    const {data} = await Axios.get('http://localhost:1337/worlds');
    dispatch(setWorlds(data));
  }catch(error){
    console.log(error);
  }
}

export const deleteWorld = (worldId) => async (dispatch) => {
  try {
    const {data: world} = await Axios.delete(`http://localhost:1337/worlds/${worldId}`);
    dispatch(_deleteWorld(world));
  } catch (error) {
    console.log(error);
  }
}


const initialState = []

export default function worldsReducer(state = initialState, action) {
  switch(action.type){
    case SET_WORLDS:
      return action.worlds;
    case CREATE_WORLD:
      return [...state, action.world];
    case DELETE_WORLD:
      return state.filter((world) => world.id !== action.world.id);
    default:
      return state;
  };

}

const intialErrorState = "";
export function worldErrorReducer(state = intialErrorState, action){
  switch(action.type){
    case CREATE_WORLD_ERROR:
      return action.error;
    case CLEAR_WORLD_ERROR:
      return intialErrorState;
    default:
      return state;
  }
}