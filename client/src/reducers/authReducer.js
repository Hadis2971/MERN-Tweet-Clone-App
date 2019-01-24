import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from "../actions/actionTypes";

const initialState = {
    loading: false,
    token: null,
    user: null,
    isAuthenticated: false
};


const authReducer = (state = initialState, acion) => {
    switch(acion.type){
        case(AUTH_START):
        return state = {
            ...state,
            loading: true
        };
        case(AUTH_SUCCESS):
        return state = {
            ...state,
            loading: false,
            token: acion.token,
            user: acion.user,
            isAuthenticated: acion.token !== null
        };
        case(AUTH_FAIL):
        return state = {
            ...state,
            loading: false,
            token: null,
            user: null,
            isAuthenticated: false
        };
        case(AUTH_LOGOUT):
        return state = {
            ...state,
            loading: false,
            token: null,
            user: null,
            isAuthenticated: false
        };
        default: 
        return state;
    }
};

export default authReducer;