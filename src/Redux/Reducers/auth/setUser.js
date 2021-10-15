import { SET_USER_FAILED, SET_USER_SUCCESS } from "../../Actions-types/auth";

export default (state, {type, payload}) =>{
    switch(type){
        case SET_USER_SUCCESS:
            return {
                ...state,
                currUser: {
                    loading: false,
                    data: payload
                }
            };

        case SET_USER_FAILED:
            return {
                ...state,
                currUser: {
                    loading: false,
                    data: {}
                }
            }
    }
}