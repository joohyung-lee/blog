import asyncRoute from 'lib/asyncRoute';
//import {DetailView} from 'containers/detail';
//export {DetailView}
//pages
export const Main = asyncRoute(() => import('containers/main'));
export const DetailView = asyncRoute(() => import('containers/detail/detailView'));
export const RedirectLogin = asyncRoute(() => import('components/loginPopup/redirect'));
export const Profile  = asyncRoute(() => import('containers/mypage/profile'));
export const AdminMain = asyncRoute(() => import('containers/admin'));
export const Write = asyncRoute(() => import('containers/admin/write'));
export const Header = asyncRoute(() => import('containers/header'));
export const Search = asyncRoute(() => import('containers/search'));
export const NotFound = asyncRoute(() => import('components/common/error/404'));

