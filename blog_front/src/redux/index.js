import { combineReducers } from 'redux';
import modal from './modal/modalRedux';
import auth from './auth/authRedux';

export default combineReducers({
    modal,
    auth
});