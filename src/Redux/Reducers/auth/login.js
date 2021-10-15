import { LOGIN_ERROR, LOGIN_START, LOGIN_SUCCESS } from "../../Actions-types/auth";

export default (state, {type, payload}) =>{
    switch(type){
        case LOGIN_START:
            return {
                ...state,
                loginState: {
                    ...state.loginState,
                    loading: true,
                    error: ''
                }
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                loginState: {
                    ...state.loginState,
                    loading: false,
                    error: '',
                    data: payload
                }
            }

        case LOGIN_ERROR:
            return {
                ...state,
                loginState: {
                    ...state.loginState,
                    loading: false,
                    error: payload
                }
            }
    }
}