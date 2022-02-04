import { combineReducers } from 'redux'
import worldsReducer from './worlds'
import singleWorldReducer from './singleWorld';
import postsReducer from './posts';
import commentsReducer from './comments';
import singlePostReducer from './singlePost';

const appReducer = combineReducers({
    worlds: worldsReducer,
    world: singleWorldReducer,
    posts: postsReducer,
    comments: commentsReducer,
    post: singlePostReducer
});

export default appReducer