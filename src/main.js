import { Router } from 'director/build/director';
import Util from './common-component/util/util';
import API from './api/Api.js';
import './asset/reset.scss';

// 引入垫片兼容IE
import "babel-polyfill";

/*按需加载require方式，和组件里面的module.exports对应*/
/*登陆页*/
const LoginCb = function() {
    require.ensure([], (require) => {
        let Login = require('./pages/login/login.js');
        Login.default();
    },'Login')
};
/*首页*/
const HomePageCb = function(userId) {
    require.ensure([], (require) => {
        let HomePage = require('./pages/home-page/home-page.js');
        HomePage.default(userId);
    },'HomePage')
};

const routes = {
    '/': () => {
        let userId = Util.getCookie('userId');
        Util.linkTo('/home-page/' + userId);
    },
    '/login': LoginCb,
    '/home-page/:userId': HomePageCb
};

const router = new Router(routes).configure({
    notfound: () => {
        alert('错误链接！');
    },
    before: () => {
        let userId = Util.getCookie('userId');
        if(!userId && location.hash.indexOf('/login') < 0){
            Util.linkTo('/login');
            return false;
        }
    }
});
router.init();

//初始化默认路由
if(!Util.getRouter()){
    Util.linkTo('/');
}




