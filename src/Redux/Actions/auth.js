import axios from "axios"
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, SET_USER_SUCCESS, SET_USER_FAILED, LOGOUT_START, LOGOUT_SUCCESS } from "../Actions-types/auth"
import config from '../../Utils/config'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (data, navigation) =>async(dispatch) =>{
    dispatch({
        type: LOGIN_START
    })

    try {
        const res = await axios.post(`${config.apiRoute}/companys/signin`, data);
        if(res.status === 200){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.data
            });
            await AsyncStorage.setItem('credentials', JSON.stringify(res.data.data.cred));
            await AsyncStorage.setItem('token', res.data.data.token);
            setCurrUser(res.data.data.cred)(dispatch)
            navigation.push('tab')
        }
    } catch (error) {
        const res = error.response;
        console.log(JSON.stringify(res));
        if(res){
            dispatch({
                type: LOGIN_ERROR,
                payload: res.data.error
            })
        }else{
            dispatch({
                type: LOGIN_ERROR,
                payload: "Quelque chose s'est mal passée"
            })
        }
    }
};

export const setCurrUser = (data) =>async(dispatch) =>{
    if(data){
        dispatch({
            payload: data,
            type: SET_USER_SUCCESS
        })
    }else{
        dispatch({
            type: SET_USER_FAILED
        })
    }
};

export const logout = (nav) =>async(dispatch) =>{
    dispatch({
        type: LOGOUT_START
    })
    await AsyncStorage.removeItem('credentials');
    await AsyncStorage.removeItem('token');
    dispatch({
        type: LOGOUT_SUCCESS
    });
    nav.push('login')
}