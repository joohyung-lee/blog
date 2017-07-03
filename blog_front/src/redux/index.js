import { combineReducers } from 'redux';
import modal from './modal';
import auth from './auth';
import motionLab from './motionLab';
export default combineReducers({
    modal,
    auth,
    motionLab
});