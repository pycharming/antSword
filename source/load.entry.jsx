$(document).ready(() => {
  Date.prototype.format = function(format) {
    const o = {
      "M+" : this.getMonth()+1,
      "d+" : this.getDate(),
      "h+" : this.getHours(),
      "m+" : this.getMinutes(),
      "s+" : this.getSeconds(),
      "q+" : Math.floor((this.getMonth()+3)/3),
      "S" : this.getMilliseconds()
    }
    if(/(y+)/.test(format)) {
      format=format.replace(RegExp.$1, (this.getFullYear()+"").substr(4- RegExp.$1.length))
    };
    for(var k in o) {
      if(new RegExp("("+ k +")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length==1? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
      }
    }
    return format;
  }
  layer.config({extend: 'extend/layer.ext.js'});

  function loadJS(js, cb) {
    var script = document.createElement('script');
    script.src = js;
    script.onload = cb;
    document.head.appendChild(script);
  }
  loadJS('../static/libs/dhtmlx/codebase/dhtmlx_pro.js', () => {
    loadJS('../static/build/app.bundle.js', null);
  });
});