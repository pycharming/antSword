'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// 导入模块
const Menubar = require('./modules/menubar');
const Request = require('./modules/request');
const Database = require('./modules/database');
const Cache = require('./modules/cache');

// electron.crashReporter.start();

app
  .on('window-all-closed', app.quit)
  .on('ready', () => {
    let mainWindow = new BrowserWindow({
      width: 1040,
      height: 699,
      minWidth: 1040,
      minHeight: 699,
      webgl: false,
      title: 'AntSword',
      // autoHideMenuBar: true,
      // transparent: false,
      // frame: false
      // resizable: false
    });
    mainWindow.loadURL(`file:\/\/${__dirname}/views/index.html`);

    // 是否重新加载刷新UI
    // 获取初始化窗口大小
    let winSize = mainWindow.getSize();
    const reloadUI = () => {
      // 判断调整大小是否已经超过界限
      // 判断标准：取调整后的长(宽)与之前的长(宽)绝对值，>= 10就提示调整，最后保存调整后的长宽值
      let _winSize = mainWindow.getSize();
      if (Math.abs(_winSize[0] - winSize[0]) < 10 && Math.abs(_winSize[1] - winSize[1]) < 10) {
        return;
      };
      winSize = _winSize;
      mainWindow.webContents.executeJavaScript(`
        layer.confirm(
          '窗口已经调整，是否重启应用刷新UI？',
          {
            title: '重启应用',
            btn: ['好的','不必']
          },
          location.reload.bind(location)
        );
      `);
    }
    mainWindow
      .on('closed', () => { mainWindow = null })
      .on('resize', reloadUI)
      .on('maximize', reloadUI)
      .on('unmaximize', reloadUI)
      .on('enter-full-screen', reloadUI)
      .on('leave-full-screen', reloadUI);

    // 打开调试控制台
    // mainWindow.webContents.openDevTools();

    new Menubar(electron, app, mainWindow);

    // 监听Request请求
    new Request(electron);

    // 初始化数据库
    new Database(electron);

    // 初始化缓存模块
    new Cache(electron);

  });