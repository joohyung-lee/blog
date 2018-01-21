import asyncRoute from 'lib/asyncRoute';
import MobileDetect from 'mobile-detect';
import Header from 'containers/header';
import DetailView from 'containers/detail/detailView';
import Search from 'containers/search';
import MarkdownView from 'components/common/markdown';
import NotFound from 'components/common/error/404';
export {
    DetailView,
    Search,
    NotFound,
    Header,
    MarkdownView
}
//components
//export const MarkdownView = asyncRoute(() => import('components/common/markdown'));
//pages
let md = new MobileDetect(window.navigator.userAgent);

export const Main = asyncRoute(() => (md.mobile())?import('containers/main/mobile'):import('containers/main'));
export const RedirectLogin = asyncRoute(() => import('components/loginPopup/redirect'));
export const Collections  = asyncRoute(() => import('containers/mypage/collections'));
export const AdminMain = asyncRoute(() => import('containers/admin'));
export const Write = asyncRoute(() => import('containers/admin/write'));

