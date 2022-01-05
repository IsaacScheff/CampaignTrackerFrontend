import { combineReducers } from 'redux'
import worldsReducer from './worlds'

const appReducer = combineReducers({
    worlds: worldsReducer
});

export default appReducer