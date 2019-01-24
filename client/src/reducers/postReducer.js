import { POST_SUCCESS, GET_USER_POSTS, DELETE_POST_SUCCESS, UPDATE_POST_SUCCESS } from "../actions/actionTypes";

const initialState = {
    posts: []
}

const postReducer = (state = initialState, action) => {
    switch(action.type){
        case(POST_SUCCESS):
        let newArray = [...state.posts];
        newArray.push(action.newPost);
        
        return state = {
            posts: newArray
        };
        case(GET_USER_POSTS):
        //console.log(state.posts);
        //console.log(action);
        return state = {
            posts: action.userPosts
        };
        case(DELETE_POST_SUCCESS):
        let helpArr = [...state.posts];
        
        helpArr = helpArr.filter(post => {
            if(post.text !== action.post){
                return post;
            }
        });
        return state = {
            posts: helpArr
        }
        case(UPDATE_POST_SUCCESS):
        return state = {
            posts: action.newPost
        }
        default:
        return state;
    }
}

export default postReducer;