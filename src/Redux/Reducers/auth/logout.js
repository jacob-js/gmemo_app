import { LOGOUT_SUCCESS } from "../../Actions-types/auth";

export default (state, {type, payload}) =>{
    switch(type){
        case LOGOUT_SUCCESS:
            return {
                ...state,
                currUser: {
                    loading: false,
                    data: {}
                }
            };
    }
}