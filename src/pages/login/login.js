/**
 * Created with JetBrainsWebStorm.
 * User: xiongpeng
 * Date: 2017/10/11 0011
 * Time: 上午 10:11
 * Desc: 登陆页
 */
import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import API from '../../api/Api.js';
import LoginTpl from './login.html';

import "./login.scss";

export default function Login() {
    $("#app-container").html( LoginTpl({ title: '测试' }) );
    $(".login-btn").on('click',function(){
        const userId = '456';
        Util.addCookie('userId',userId,1,document.domain);
        Util.linkTo('/home-page/' + userId);
    })
}
