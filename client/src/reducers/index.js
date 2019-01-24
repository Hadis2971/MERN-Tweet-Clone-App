import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorsReducer,
    post: postReducer
});

export default rootReducer;