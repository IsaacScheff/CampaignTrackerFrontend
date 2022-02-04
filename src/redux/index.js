import { combineReducers } from 'redux'
import worldsReducer from './worlds'
import singleWorldReducer from './singleWorld';
import postsReducer from './posts';
import commentsReducer from './comments';

const appReducer = combineReducers({
    worlds: worldsReducer,
    world: singleWorldReducer,
    posts: postsReducer,
    comments: commentsReducer
});

export default appReducer