import { combineReducers, createStore } from "redux";
import Reducers from "./Reducers";
import state from './IntialStates'

const store = createStore(combineReducers(Reducers), state);

export default store;