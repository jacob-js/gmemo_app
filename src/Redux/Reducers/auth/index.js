import states from '../../IntialStates';
import login from './login';
import logout from './logout';
import setUser from './setUser';

export default (state=states.auth, action={}) =>({
    ...state,
    ...login(state, action),
    ...setUser(state, action),
    ...logout(state, action)
})