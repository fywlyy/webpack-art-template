var TableTpl = require("./table.html");

import "./table.css";

module.exports = function($el, id,  data, cbk){
    data.tableId = id;
    data.formatObj = function(func, tb, index){
        var dataTmp = func;
        dataTmp.tableIndex = index;
        dataTmp.obj = tb;
        return JSON.stringify(dataTmp);
    };
    $el.empty();
    $el.append(TableTpl(data));
    $('#' + id + ' tbody tr:odd').addClass('ts-table-odd');
    $el.addClass('ts-table-ctt-parent');
    data.tHeader.map((item,index) => {
        if(!item.width){
            var $th = $el.find('th').eq(index);
            var offsetWidth = $th[0].offsetWidth;

            $th.css({
                width: offsetWidth
            });
        }
    });
    if(cbk){
        cbk();
    }
    $('.ts-table-ops ul').hover(function(e){
        var $target = $(e.target);
        if(!$target.is('ul')){
            $target = $target.parents('ul');
        }
        var offset = $target.offset();
        var top = offset.top - (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop);
        var css1 = '<div id="ood1"><style>.ts-css1{position: fixed !important;top: '
            + top + 'px !important; left: ' + offset.left + 'px !important;}</style></div>';
        $target.append(css1).addClass('ts-css1');
    }, function(e){
        var $target = $(e.target);
        if(!$target.is('ul')){
            $target = $target.parents('ul');
        }
        $target.removeClass('ts-css1');
        $('#ood1').remove();
        //$target.css({position: 'fixed', top: offset.top + 'px', left: offset.left + 'px'});
    });
    $('#'+id+' .ts-table-operate').bind('click', function(e){
        var $target = $(e.target);
        if(!$target.is('.ts-table-operate')){
            $target = $target.parents('.ts-table-operate');
        }
        data.opFunction($target.data('objs'));
    });
    $('#'+id+' .ts-table-htt').bind('click', function(e){
        var $target = $(e.target);
        if(!$target.is('.ts-table-htt')){
            $target = $target.parents('.ts-table-htt');
        }
        data.opFunction($target.data('objs'));
    });
};