import { combineReducers } from 'redux';
import admin from './admin';
import modal from './modal';
import auth from './auth';
import motionLab from './motionLab';
export default combineReducers({
    admin,
    modal,
    auth,
    motionLab
});