import axios from "axios";

import { POST_SUCCESS, GET_USER_POSTS, UPDATE_POST_SUCCESS, DELETE_POST_SUCCESS } from "./actionTypes";


export const post = (id, post) => dispatch => {
    axios.post("http://localhost:5000/api/user/posts", {
        id: id,
        text: post
      })
      .then((response) => {
        dispatch({
          type: POST_SUCCESS,
          newPost: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
}

export const getPosts = (id) => dispatch => {
  axios.get("http://localhost:5000/api/user/posts/" + id)
  .then((response) => {
      dispatch({
        type: GET_USER_POSTS,
        userPosts: response.data
      });
  })
  .catch((error) => {
    console.log(error);
  });
}

export const deletePost = (user, id) => dispatch => {

  axios.delete("http://localhost:5000/api/user/posts", {
    data: { user: user, id: id }
   })
  .then(response => {
    dispatch({
      type: DELETE_POST_SUCCESS,
      post: response.data.text
    });
    
  })
  .catch(error => console.log(error));  
}

export const updatePost = (id, newText, user) => dispatch => {
  axios.put("http://localhost:5000/api/user/posts", {
        id: id,
        newText: newText,
        user: user
      })
      .then((response) => {
        dispatch({
          type: UPDATE_POST_SUCCESS,
          newPost: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
}