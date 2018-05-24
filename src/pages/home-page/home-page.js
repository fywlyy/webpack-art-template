/**
 * Created with JetBrainsWebStorm.
 * User: xiongpeng
 * Date: 2017/10/11 0011
 * Time: 上午 10:11
 * Desc: 登陆页
 */
import _ from 'underscore';
import Util from '../../common-component/util/util.js';
import Table from '../../common-component/table/table.js';
import API from '../../api/Api.js';
import HomePageTpl from './home-page.html';

import "./home-page.scss";

export default function HomePage() {
    $("#app-container").html( HomePageTpl({userName: '用户名XXX'}) );

    var tHeader = [
        {title: '操作', width: '100px', hasFunc: true
            , funcList: [{name: '编辑', op: 'edit', cls: 'earning-manage-edit'}
            ,{name:'查看', op: 'checked', cls: 'earning-manage-checked'}
            ,{name:'审核', op: 'review', cls: 'earning-manage-review'}
            ,{name: '删除', op: 'delete', cls: 'earning-manage-delete'}]}
        , {title: '实际到账日期', width: '120px', name: 'actualDate', handler: function(str){
            return str;
        }}
        , {title: '收入金额', name:  'money', handler: function(str){
            return str;
        }}
        , {title: '经手人',  width: '300px', name:  'operatorName', handler: function(str){
            return str;
        }}
        , {title: '备注', name:  'remarks', handler: function(str){
            return str;
        }}
        , {title: '审核状态', name:  'stateText',  handler: function(str){
            return str;
        }}
        , {title: '审批人', name:  'auditUserName',  handler: function(str){
            return str;
        }}
        , {title: '审核时间', width: '120px', name:  'auditDate',  handler: function(str){
            return str;
        }}
        , {title: '审核状态', name:  'stateText',  handler: function(str){
            return str;
        }}
        , {title: '审批人', name:  'auditUserName',  handler: function(str){
            return str;
        }}
        , {title: '审核时间', width: '120px', name:  'auditDate',  handler: function(str){
            return str;
        }}
    ];

    Table($(".workspace-layout"),'testTable',{
        tHeader: tHeader,
        data: [{
            index: 0,
            actualDate: '2017-10-16',
            money: '1000',
            operatorName: '张三爱的发发发发大撒发生福多水电费水电费水电费打算发盛大发顺丰俺的沙发大',
            remarks: '无',
            stateText: '已审核',
            auditUserName: '王二',
            auditDate: '2017-10-15',
            stateText: '已审核',
            auditUserName: '王二',
            auditDate: '2017-10-15'
        },{
            index: 1,
            actualDate: '2017-10-16',
            money: '1000',
            operatorName: '张三',
            remarks: '无',
            stateText: '已审核',
            auditUserName: '王二',
            auditDate: '2017-10-15',
            stateText: '已审核',
            auditUserName: '王二',
            auditDate: '2017-10-15'
        },{
            index: 2,
            actualDate: '2017-10-16',
            money: '1000',
            operatorName: '张三',
            remarks: '无',
            stateText: '已审核',
            auditUserName: '王二',
            auditDate: '2017-10-15',
            stateText: '已审核',
            auditUserName: '王二',
            auditDate: '2017-10-15'
        }],
        opFunction: (obj) => {
            console.log(obj);
        }
    },() => {

    });

    $("#testTable").colResizable({
        minWidth: 100,
        selfResize: true
    });
}
