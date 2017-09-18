import { combineReducers } from 'redux';
import common from './common';
import admin from './admin';
import modal from './modal';
import auth from './auth';
import motionLab from './motionLab';
export default combineReducers({
    common,
    admin,
    modal,
    auth,
    motionLab
});