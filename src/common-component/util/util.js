import _ from 'underscore';
import spinnerImg from '../../asset/images/Spinner.gif';

Date.prototype.format = function(formatStr){
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
    var month = this.getMonth() + 1;
    str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
    str = str.replace(/M/g, month);

    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());
    return str;
}



module.exports = {
    getRouter: function() {
        return document.location.hash.split('#')[1]
    },
    linkTo: function(url) {
        location.hash = url;
    },
    /**
     * Created with JetBrains WebStorm.
     * User: liyong.wang
     * Date: 16/12/5
     * Time: 下午4:56
     * Desc: 各种日期格式化函数
     */
    dateFormat: function (dateStr) {
        return dateStr ? new Date(dateStr).format('yyyy-MM-dd hh:mm:ss') : "";
    },
    dateFormatWithChinese: function (dateStr) {
        return dateStr ? new Date(dateStr).format('yyyy年MM月dd日 hh:mm:ss') : "";
    },
    dateFormatByMonth: function (dateStr) {
        const type = this.language().login_flag, dateInfo = this.getDateNum(dateStr);
        if (type == 1) {
            return dateStr ? new Date(dateStr).format('yyyy-MM-dd') : "";
        }
        return dateStr ? `${dateInfo.month}/${dateInfo.day}/${dateInfo.year}` : '';
    },
    dateFormatByMonthWithChinese: function (dateStr) {
        const type = this.language().login_flag,
            month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], dateInfo = this.getDateNum(dateStr);

        if (type == 1) {
            return dateStr ? new Date(dateStr).format('yyyy-MM-dd') : "";
        }
        return dateStr ? `${dateInfo.month}/${dateInfo.day}/${dateInfo.year}` : '';
        // return dateStr ? `${month[dateInfo.month]} ${dateInfo.day}, ${dateInfo.year}` : "";
    },
    dayFormat: function (dataStr, type) {
        if (!dataStr) {
            return '';
        }
        if (!type) {
            type = '-';
        }
        var dateSs = new Date(dataStr);
        var year = dateSs.getFullYear();
        var month = dateSs.getMonth() + 1;
        var day = dateSs.getDate();
        month > 9 ? null : (month = '0' + month);
        day > 9 ? null : (day = '0' + day);
        return year + type + month + type + day;
    },
    getDateNum(timestamp) {
        var dateSs = new Date(timestamp);
        var year = dateSs.getFullYear();
        var month = dateSs.getMonth() + 1;
        var day = dateSs.getDate();
        if (month < 10) {
            month = `0${month}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }
        return {
            year,
            month,
            day
        }
    },
    priceFormat: function (price) {
        return price >= 0 && price !== "" ? parseFloat(parseFloat(price) / 100).toFixed(2) : "";
    },
    priceFormatMinus: function (price) {
        return price !== "" ? parseFloat(parseFloat(price) / 100).toFixed(2) : 0;
    },
    /**
     * 根据传入参数计算当前价格保留位数 四舍五入,当前函数是为了在四舍五入的时候不丢失精度
     * @param price  价格
     * @param n 保留位数
     * @returns {number}
     */
    moneyPrice: function (price, n) {
        var dd = 1; //计算倍数
        var tempNum;
        for (var i = 0; i < n; i++) {
            dd *= 10;
        }
        tempNum = price * dd;
        tempNum = Math.round(tempNum);
        tempNum = (tempNum / dd).toFixed(n);
        return tempNum;
    },
    /**
     * Created with JetBrains WebStorm.
     * User: liyong.wang
     * Date: 16/12/5
     * Time: 下午4:51
     * Desc: 将金额单位元转换为分.确保不丢失精度
     */
    priceFormatRevers: function (price) {
        var reg = /^\+?(\d*\.\d{2})$/
        var priceArr = [], tempArr = [], originPrice = 0;
        if (price != null && price != "") {
            if (reg.test(price)) {//2位小数
                tempArr = (price + "").split(".");
                for (var i in tempArr) {
                    if (tempArr[i] != ".") {
                        priceArr.push(tempArr[i]);
                    }
                }
                originPrice = parseInt(priceArr.join(""));
            } else {
                originPrice = price * 100;
            }
        } else {
            originPrice = 0;
        }
        return originPrice;
    },
    /**
     * Created with JetBrains WebStorm.
     * User: liyong.wang
     * Date: 16/12/5
     * Time: 下午4:50
     * Desc: 当金额浮点型数字为空则format为空 而非 0.00
     */
    priceFormatByNull: function (price) {
        return price > 0 ? parseFloat(parseFloat(price) / 100).toFixed(2) : "";
    },
    /**
     * Created with JetBrains WebStorm.
     * User: liyong.wang
     * Date: 16/12/5
     * Time: 下午4:49
     * Desc: 通过hash对数组进行去重.
     */
    unique: function (arr) {
        var tmpArr = [], hash = {};//hash为hash表
        for (var i = 0; i < arr.length; i++) {
            if (!hash[arr[i].attrValue.id]) {//如果hash表中没有当前项
                hash[arr[i].attrValue.id] = true;//存入hash表
                tmpArr.push(arr[i]);//存入临时数组
            }
        }
        return tmpArr;
    },
    /**
     * 设置cookie
     * @param objName {string} :cookie key
     * @param objValue {string} :cookie value
     * @param objDays {number} : expire day
     * @param objDomain ?
     * */
    addCookie: function( objName, objValue, objDays, objDomain ){
        // use escape to avoid @#$%^%
        var str = objName + "=" + escape(objValue);
        str += ";path=/;domain=" + objDomain ;
        if( objDays > 0 ){
            var date = new Date();
            var ms = objDays * ( 3600 * 24 * 1000 );
            date.setTime( date.getTime() + ms );
            str += ";expires=" + date.toGMTString();
        }
        return document.cookie = str ;
    },
    /**
     * 获取cookie
     * @param objName {string} : cookie key
     * */
    getCookie: function( objName ){
        var arrStr = document.cookie.split("; ");
        var objVal = "";
        for( var i = 0,l = arrStr.length; i < l ; i++ ){
            var temArr = arrStr[i].split("=" );
            if( temArr[0] === objName ){
                objVal = unescape( temArr[1]  )
            }
        }
        return objVal;
    },
    /**
     * 删除cookie
     * @param objName
     * @param objDomain
     * @returns {string}
     */
    deleteCookie: function(objName, objDomain) {
        return document.cookie = objName + "=;path=/;domain=" + objDomain + ";expires=" + (new Date(0)).toGMTString();
    },
    /**
     * Created with JetBrains WebStorm.
     * User: liyong.wang
     * Date: 16/12/5
     * Time: 下午4:45
     * Desc: 弹出提示窗口 delay参数可以为时间,即等待消失时间 也可以为function,即消失后回调. 也可以三者都传入
     */
    alertMessage: function (desc, delay, callback, hasIcon = true) {
        let time = 1500, doc = document,
            body = doc.body, h = 0, hints = doc.querySelector('.hint-popup'),
            timer1 = null, timer2 = null, icon = hasIcon;

        if (hints) {
            return;
        }

        if (typeof delay === 'boolean') {
            icon = delay;
        } else {
            if (!isNaN(delay)) {
                time = delay;
            }
        }

        const div = doc.createElement("div"),
            html = `<div class="hint-content">${icon ? '<i class="icon"></i>' : ''}${desc}</div>`;
        div.className = 'hint-popup show';
        div.innerHTML = html;

        body.appendChild(div);

        div.style.marginTop = `${-(div.offsetHeight / 2)}px`;

        setTimeout(()=> {
            div.className = 'hint-popup hide-hint';
            setTimeout(()=> {
                body.removeChild(div);
                clearTimeout(timer2);
            }, 300);
            clearTimeout(timer1);
            if (typeof delay === 'function') {
                delay();
            }
            if (callback) {
                if (typeof callback === 'function') {
                    callback();
                }

            }
        }, time);
    },
    clone: function (obj) {
        var o;
        if (typeof obj == "object") {
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(this.clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var j in obj) {
                        o[j] = this.clone(obj[j]);
                    }
                }
            }
        } else {
            o = obj;
        }
        return o;
    },
    htmlDecode: function (str) {
        return $('<div>').html(str).text();
    },
    htmlEncode: function (html) {
        return $('<div>').text(html).html();
    },
    loading: function (flag, loadingText) {
        if (flag) {
            var loadingText = loadingText || "努力加载中...";
            var html = '<div class="loader-inner">' +
                '<img src="' + spinnerImg + '"/>' +
                '<p>' + loadingText + '</p></div>';
            var loader = document.createElement('div');

            loader.setAttribute('class', 'loader');
            document.body.appendChild(loader);
            document.getElementsByClassName('loader')[0].innerHTML = html;
        } else {
            var loader = document.getElementsByClassName('loader')[0];
            loader.parentNode.removeChild(loader);
        }
    },
    /**
     * 格式化数字；
     * @param num
     * @returns {*}
     */
    floatNum: function (num) {
        if (!num) {
            return 0;
        }
        if (num >= 10000) {
            return Math.floor(num / 1000) / 10 + 'w';
        }
        if (num >= 1000) {
            return Math.floor(num / 100) / 10 + 'k';
        }
        return num;
    },
    /**
     * 格式化文件大小显示
     * @param size 文件大小
     * @returns {string}
     */
    formatFileSize: function (size) {
        var fileSize = '';
        // 不是数字
        if (isNaN(size)) {
            fileSize = size;
        } else {
            // 文件大小显示Mb
            if (size / (1024 * 1024) >= 1) {
                fileSize = parseFloat(size / (1024 * 1024)).toFixed(2) + 'Mb';
            } else if (size / 1024 * 1024 >= 1) { // 文件大小显示Kb
                fileSize = parseFloat(size / (1024)).toFixed(2) + 'Kb';
            } else {
                fileSize = size + 'B';
            }
        }
        return fileSize;
    },
}