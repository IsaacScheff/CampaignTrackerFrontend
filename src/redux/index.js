import { combineReducers } from 'redux'
import worldsReducer from './worlds'
import singleWorldReducer from './singleWorld';

const appReducer = combineReducers({
    worlds: worldsReducer,
    world: singleWorldReducer
});

export default appReducer