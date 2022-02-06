import { combineReducers } from 'redux'
import worldsReducer from './worlds'
import singleWorldReducer from './singleWorld';
import postsReducer from './posts';
import commentsReducer from './comments';
import singlePostReducer from './singlePost';
import postTypesReducer from './postTypes';
import auth from './auth';

const appReducer = combineReducers({
    worlds: worldsReducer,
    world: singleWorldReducer,
    posts: postsReducer,
    comments: commentsReducer,
    post: singlePostReducer,
    types: postTypesReducer,
    auth
});

export default appReducer