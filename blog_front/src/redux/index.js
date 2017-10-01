import { combineReducers } from 'redux';
import common from './common';
import main from './main';
import posts from './posts';
import admin from './admin';
import modal from './modal';
import auth from './auth';
import motionLab from './motionLab';
export default combineReducers({
    common,
    main,
    posts,
    admin,
    modal,
    auth,
    motionLab
});