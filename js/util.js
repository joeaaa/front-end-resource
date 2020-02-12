/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
 
/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()
 
  const diff = (now - d) / 1000
 
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
 
/** 获取存储空间大小
 * @param fileSize
 */
export function getFileShowSize(fileSize) {
  if (fileSize) {
    var KLength = 1024
    var MLength = KLength * 1024
    var GLength = MLength * 1024
    var TLength = GLength * 1024
 
    var showStr = ''
    var T = 0
    var G = 0
    var M = 0
    var K = 0
    T = fileSize / TLength
    G = fileSize / GLength
    M = fileSize / MLength
 
    T = parseInt(T.toFixed(2))
    G = parseInt(G.toFixed(2))
    M = parseInt(M.toFixed(2))
 
    if (T > 0) {
      // 如果大于1T则显示为2.34TB样式
      T = fileSize / TLength
      showStr = T.toFixed(2) + 'TB'
    } else if (G > 0) {
      // 如果大于1G则显示为2.34GB样式
      G = fileSize / GLength
      showStr = G.toFixed(2) + 'GB'
    } else if (M > 0) {
      // 如果大于1M则显示为2.34MB样式
      M = fileSize / MLength
      showStr = M.toFixed(2) + 'MB'
    } else {
      // 显示为44KB
      K = fileSize / KLength
      if (parseInt(K)) {
        showStr = parseInt(K) + 'KB'
      } else {
        showStr = '--'
      }
    }
    return showStr
  } else {
    return '--'
  }
}
 
//阻止冒泡
function stopBubble (e) {
  //如果提供了事件对象，则这是一个非IE浏览器
  if ( e && e.stopPropagation ) {
    //因此它支持W3C的stopPropagation()方法
    e.stopPropagation();
  }
  else {
    //否则，我们需要使用IE的方式来取消事件冒泡
    window.event.cancelBubble = true;
  }
}
 
//阻止浏览器的默认行为
function stopDefault ( e ) {
  //防止浏览器默认行为(W3C)
  if(e && e.preventDefault){
    e.preventDefault();
  }
  //IE中组织浏览器行为
  else{
    window.event.returnValue=false;
    return false;
  }
}
 
// 文件下载
function downloadFile (url) {
  var $form = $('<form method="GET"></form>');
  $form.attr('action', url);
  $form.appendTo($('body'));
  $form.submit();
  $form.remove();
}
 
// js 根据文件大小换算合适单位，并保留两位小数
function getFileSize (fileByte) {
  var fileSizeByte = fileByte;
  var fileSizeMsg = "";
  if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
  else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
  else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
  return fileSizeMsg;
}
 
//用正则表达式实现html转码
function htmlEncodeByRegExp (str){
  if(!str) return "";
  var s = "";
  s = str.replace(/&/g,"&amp;");
  s = s.replace(/</g,"&lt;");
  s = s.replace(/>/g,"&gt;");
  s = s.replace(/ /g,"&nbsp;");
  s = s.replace(/\'/g,"&#39;");
  s = s.replace(/\"/g,"&quot;");
  return s;
}
 
//用正则表达式实现title换行
function titleBrByRegExp (str){
  if(!str) return "";
  var s = "";
  s = str.replace(/<br>/g,"&#13");
  s = s.replace(/<br\/>/g,"&#13;");
  s = s.replace(/<br \/>/g,"&#13;");
  return s;
}
 
/**
 * 获取光标位置函数
 * @param obj   input或者textarea对象
 * @returns {number}  获取到的光标位置
 */
function getCursortPosition (obj) {
  var CaretPos = 0; // IE Support
  if (document.selection) {
    obj.focus ();
    var Sel = document.selection.createRange ();
    Sel.moveStart ('character', -obj.value.length);
    CaretPos = Sel.text.length;
  }
  // Firefox support
  else if (obj.selectionStart || obj.selectionStart == '0')
    CaretPos = obj.selectionStart;
  return (CaretPos);
}
 
/**
 * 设置光标位置函数
 * @param obj   input或者textarea对象
 * @param pos   光标要移动到的位置
 */
function setCaretPosition (obj, pos){
  if(obj.setSelectionRange)
  {
    obj.focus();
    obj.setSelectionRange(pos,pos);
  }
  else if (obj.createTextRange) {
    var range = ctrl.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
}
/**
 * 字符串固定位置插入字符
 * @soure       原字符串
 * @start       要插入字符的位置
 * @newStr      要插入的字符
 * @returns {string}
 */
function insertStr(soure, start, newStr){
   return soure.slice(0, start) + newStr + soure.slice(start);
}
