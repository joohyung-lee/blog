import { combineReducers } from 'redux';
import modal from './modal/modalRedux';
import auth from './auth/authRedux';
import motionLab from './motionLab/motionLabRedux';
export default combineReducers({
    modal,
    auth,
    motionLab
});