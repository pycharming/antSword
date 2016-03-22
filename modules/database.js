// 
// shell数据管理模块
// 

'use strict';

const fs = require('fs');
const dns = require('dns');
const path = require('path');
const log4js = require('log4js');
const Datastore = require('nedb');
const qqwry = require("lib-qqwry").info();

const logger = log4js.getLogger('Database');

class Database {

  constructor(electron) {
    this.cursor = this.createDB();
    // 监听数据请求
    const ipcMain = electron.ipcMain;
    this.listenHandle(ipcMain);
  }

  createDB() {
    // 创建数据库
    // 获取用户保存目录（mac&&*unix=/home/path/,win=c:/path/appdata
    let dbPath = '';
    if (process.env.HOME) {
      dbPath = path.join(process.env.HOME, '.antSword');
    }else if (process.env.LOCALAPPPATH) {
      dbPath = path.join(process.env.LOCALAPPPATH, '.antSword');
    }else{
      dbPath = 'database';
    };
    // 创建目录
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(dbPath);
    };
    // 创建数据库
    return new Datastore({
      filename: path.join(dbPath, 'shell.db'),
      autoload: true
    });
  }

  listenHandle(ipcMain) {
    ipcMain
      // 查询数据数据,arg=find条件,比如arg={category:'test'}
      .on('shell-find', (event, arg) => {
        logger.debug('shell-find', arg);
        this.cursor
          .find(arg || {})
          .sort({
            utime: -1
          })
          .exec((err, ret) => {
            event.returnValue = ret || [];
          });
      })
      // 查询单数据
      .on('shell-findOne', (event, id) => {
        logger.debug('shell-findOne', id);
        this.cursor.findOne({
          _id: id
        }, (err, ret) => {
          event.returnValue = err || ret;
        });
      })
      // 插入数据
      // arg={category,url,pwd,ip,addr,type,encode,encoder,ctime,utime}
      .on('shell-add', (event, arg) => {
        logger.info('shell-add\n', arg);
        // 获取目标IP以及地理位置
        // 1. 获取域名
        const parse = arg['url'].match(/(\w+):\/\/([\w\.\-]+)[:]?([\d]*)([\s\S]*)/i);
        if (!parse || parse.length < 3) { return event.returnValue = 'Unable to resolve domain name from URL' };
        // 2. 获取域名IP
        dns.lookup(parse[2], (err, ip) => {
          if (err) { return event.returnValue = err.toString() };
          // 3. 查询IP对应物理位置
          const addr = qqwry.searchIP(ip);
          // 插入数据库
          this.cursor.insert({
            category: arg['category'] || 'default',
            url: arg['url'],
            pwd: arg['pwd'],
            type: arg['type'],
            ip: ip,
            addr: `${addr.Country} ${addr.Area}`,
            encode: arg['encode'],
            encoder: arg['encoder'],
            ctime: +new Date,
            utime: +new Date
          }, (err, ret) => {
            event.returnValue = err || ret;
          });
        });
      })
      /*
      // 编辑数据
      // {url,pwd,encode,type,encoder,utime}
      */
      .on('shell-edit', (event, arg) => {
        logger.warn('shell-edit\n', arg);
        // 获取目标IP以及地理位置
        // 1. 获取域名
        const parse = arg['url'].match(/(\w+):\/\/([\w\.\-]+)[:]?([\d]*)([\s\S]*)/i);
        if (!parse || parse.length < 3) { return event.returnValue = 'Unable to resolve domain name from URL' };
        // 2. 获取域名IP
        dns.lookup(parse[2], (err, ip) => {
          if (err) { return event.returnValue = err.toString() };
          // 3. 查询IP对应物理位置
          const addr = qqwry.searchIP(ip);
          // 更新数据库
          this.cursor.update({
            _id: arg['_id']
          }, {
            $set: {
              ip: ip,
              addr: `${addr.Country} ${addr.Area}`,
              url: arg['url'],
              pwd: arg['pwd'],
              type: arg['type'],
              encode: arg['encode'],
              encoder: arg['encoder'],
              utime: +new Date
            }
          }, (err, num) => {
            event.returnValue = err || num;
          })
        });
      })
      // 删除数据
      .on('shell-del', (event, ids) => {
        logger.warn('shell-del', ids);
        this.cursor.remove({
          _id: {
            $in: ids
          }
        }, {
          multi: true
        }, (err, num) => {
          event.returnValue = err || num;
        })
      })
      // 清空分类数据
      .on('shell-clear', (event, category) => {
        logger.fatal('shell-clear', category);
        this.cursor.remove({
          category: category
        }, {
          multi: true
        }, (err, num) => {
          event.returnValue = err || num;
        })
      })
      // 重命名分类
      // {oldName, newName}
      .on('shell-renameCategory', (event, arg) => {
        logger.warn('shell-renameCategory', arg);
        this.cursor.update({
          category: arg['oldName']
        }, {
          $set: {
            category: arg['newName']
          }
        }, {
          multi: true
        }, (err, num) => {
          event.returnValue = err || num;
        })
      })
      // 移动数据
      .on('shell-move', (event, arg) => {
        logger.info('shell-move', arg);
        this.cursor.update({
          _id: {
            $in: arg['ids'] || []
          }
        }, {
          $set: {
            category: arg['category'] || 'default',
            utime: +new Date
          }
        }, {
          multi: true
        }, (err, num) => {
          event.returnValue = err || num;
        })
      })
      // 
      // 添加数据库配置
      // 
      .on('shell-addDataConf', (event, arg) => {
        logger.info('shell-addDataConf', arg);
        // 1. 获取原配置列表
        this.cursor.findOne({
          _id: arg['_id']
        }, (err, ret) => {
          let confs = ret['database'] || {};
          // 随机Id（顺序增长
          const random_id = parseInt(+new Date + Math.random() * 1000).toString(16);
          // 添加到配置
          confs[random_id] = arg['data'];
          // 更新数据库
          this.cursor.update({
            _id: arg['_id']
          }, {
            $set: {
              database: confs,
              utime: +new Date
            }
          }, (_err, _ret) => {
            event.returnValue = random_id;
          });
        });
      })
      // 
      // 删除数据库配置
      // arg={_id: 'shell-ID',id: 'data-id'}
      // 
      .on('shell-delDataConf', (event, arg) => {
        logger.info('shell-delDataConf', arg);
        // 1. 获取原配置
        this.cursor.findOne({
          _id: arg['_id']
        }, (err, ret) => {
          let confs = ret['database'] || {};
          // 2. 删除配置
          delete confs[arg['id']];
          // 3. 更新数据库
          this.cursor.update({
            _id: arg['_id']
          }, {
            $set: {
              database: confs,
              utime: +new Date
            }
          }, (_err, _ret) => {
            event.returnValue = _err || _ret;
          });
        })
      })
      // 
      // 获取数据库单个配置信息
      // 
      .on('shell-getDataConf', (event, arg) => {
        logger.info('shell-getDataConf', arg);
        this.cursor.findOne({
          _id: arg['_id']
        }, (err, ret) => {
          const confs = ret['database'] || {};
          event.returnValue = err || confs[arg['id']];
        });
      })
  }

}

module.exports = Database;