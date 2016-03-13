const LANG = antSword['language']['settings'];

class About {

  constructor(sidebar) {
    sidebar.addItem({
      id: 'about',
      selected: true,
      text: `<i class="fa fa-heart-o"></i> ${LANG['about']['title']}`
    });
    const cell = sidebar.cells('about');
    cell.attachHTMLString(`
      <div align="center">
        <img src="../static/imgs/logo.png" style="width: 30%;-webkit-user-select: none;" />
      </div>
      <div style="padding: 10px; font-family: sans-serif;text-indent: 2em;">
        <p><strong>中国蚁剑是一款开源的网站管理工具，它主要面向于合法授权的渗透测试网络安全爱好者以及常规的网站操作管理人员，任何人不得用于非法用途以及盈利目的，否则后果自行承担。</strong></p>
        <p>中国蚁剑采用Electron作为外壳，ES6作为前端框架语言。完全模块化的代码架构，让你轻易地对各种功能进行最大化自由的修改添加。目前支持三大主流操作系统：windows、linux、osx，支持三大主流网站脚本：php、asp、aspx，以及自定义数据格式的custom脚本。除此之外，你可以参考代码轻易地修改添加支持脚本类型，还可以编写编码模块对源数据进行编码加密等处理操作，以绕过各种WAF以及保护自己的数据安全。</p>
        <p>当前支持三大主模块功能：文件管理、数据库管理、虚拟终端操作，以及正在开发中的插件管理功能，完全满足你的需求。<strong>目前脚本代码均来源于伟大的中国菜刀，本人只是进行了解密以及一些改动。在此向中国菜刀致敬！</strong></p>
        <hr style="border:0;width:95%;border-bottom: solid 1px #CCC;" />
        <ul style="list-style-type: none;padding: 0;margin: 0;">
          <li><strong>微博：</strong>http://weibo.com/antoor</li>
          <li><strong>交流群：</strong>130993112</li>
      </div>
    `);
  }

}

export default About;