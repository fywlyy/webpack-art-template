/**
 * Created with JetBrainsWebStorm.
 * User: xiongpeng
 * Date: 2017/10/17 0017
 * Time: 上午 10:53
 * Desc: 表格列拖拽插件
 */

(function($){
    var dragObj = null;			//拖拽对象
    var isDragging = false;		//是否正在拖拽

    $(document).on('mouseup',function(e){
        dragObj && dragObj.$dragEl && dragObj.$dragEl.parent().find('.dragging-line').hide();
        dragObj = null;
        isDragging = false;
    }).on('mousemove',function(e){
        if(!isDragging || !dragObj.$dragEl){
            return;
        }

        var $table = dragObj.$dragEl.parents('table');
        var $nextTh = dragObj.$dragEl.parent().next();
        var pageX = e.pageX;
        var selfWidth = dragObj.initWidth + pageX - dragObj.initPageX;
        var nextThWidth = dragObj.nextThInitWidth - pageX + dragObj.initPageX;

        //小于或等于最小宽度停止缩放
        if(selfWidth <= dragObj.minWidth || !dragObj.selfResize && nextThWidth <= dragObj.minWidth){
            return;
        }
        //缩放拖拽的列
        dragObj.$dragEl.parent().css({width: selfWidth});
        if(dragObj.selfResize){
            //缩放列表
            $table.css({width: dragObj.tableInitWidth + pageX - dragObj.initPageX});
        }else{
            //缩放列表
            $nextTh.css({width: nextThWidth});
        }

    });

    function init(el,options) {
        var $el = $(el);
        var $ths = $el.find('th');

        $ths.each(function(i){
                if(i == $ths.length - 1){
                    return;
                }

                $(this).css('position','relative')
                    .append('<em class="dragging-line" style="display:none;position:absolute;' +
                        'top:0;right:-1px;width:0;height:'+($el[0].offsetHeight - 2)+'px;border:1px dashed #e7e7e7;"></em>' +
                        '<em class="drag-module" style="position:absolute;top:0;right:-5px;' +
                        'width:8px;height:100%;background-color:transparent;' +
                        'cursor: col-resize;opacity: 1;z-index:1;"></em>')
                    .find('.drag-module')
                    .on('mousedown',function(e){
                        var $this = $(this);

                        isDragging = true;
                        $this.prev('.dragging-line').show();
                        dragObj = {
                            $dragEl : $this,
                            minWidth : options.minWidth,
                            selfResize: options.selfResize,
                            initPageX : e.pageX,
                            initWidth : $this.parent()[0].offsetWidth,
                            nextThInitWidth: $this.parent().next()[0].offsetWidth,
                            tableInitWidth : $(this).parents('table')[0].offsetWidth
                        };
                    });
            })
    }

    /**
     * The plugin is added to the jQuery library
     * @param {Object} options -  参数配置
     */
    $.fn.extend({
        colResizable: function(options) {
            var defaults = {
                minWidth: 15, 				//设置列的最小宽度
                selfResize: false,			//只缩放拖动的列
                onDrag: function(){} 		//拖拽回调
            };
            var options =  $.extend(defaults, options);

            return this.each(function() {
                init(this, options);
            });
        }
    });
})(jQuery);