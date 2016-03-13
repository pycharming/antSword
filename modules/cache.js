// 
// 缓存管理模块
// 

'use strict';

const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const Datastore = require('nedb');

const logger = log4js.getLogger('Cache');

class Cache {

  constructor(electron) {
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
    // 创建数据目录
    if (!fs.existsSync(dbPath)) {
      fs.mkdirSync(dbPath);
    };
    // 创建缓存目录
    const cachePath = path.join(dbPath, 'cache');
    if (!fs.existsSync(cachePath)) {
      fs.mkdirSync(cachePath);
    };
    this.dbPath = dbPath;
    this.cachePath = cachePath;
    // 监听数据请求
    this.listenHandle(electron.ipcMain);
  }

  listenHandle(ipcMain) {
    logger.info('listenHandle');
    ipcMain
      // 添加缓存
      // arg={id="shellID",tag="存储标识",cache="存储内容"}
      .on('cache-add', (event, arg) => {
        logger.debug('cache-add', arg);
        this.createDB(arg['id']).insert({
          tag: arg['tag'],
          cache: arg['cache']
        }, (err, ret) => {
          event.returnValue = err || ret;
        });
      })
      // 更新缓存
      // arg = {id, tag, cache}
      .on('cache-set', (event, arg) => {
        logger.debug('cache-set', arg);
        this.createDB(arg['id']).update({
          tag: arg['tag']
        }, {
          $set: {
            cache: arg['cache']
          }
        }, (err, ret) => {
          event.returnValue = err || ret;
        });
      })
      // 查询缓存
      // arg={id="shellID", tag="存储标识"}
      .on('cache-get', (event, arg) => {
        logger.debug('cache-get', arg);
        this.createDB(arg['id']).findOne({
          tag: arg['tag']
        }, (err, ret) => {
          event.returnValue = err || ret;
        })
      })
      // 删除缓存
      // arg = {id: 'SHELL-ID', tag: 'SAVE-TAG'}
      .on('cache-del', (event, arg) => {
        logger.warn('cache-del', arg);
        this.createDB(arg['id']).remove({
          tag: arg['tag']
        }, (err, ret) => {
          event.returnValue = err || ret;
        })
      })
      // 清空缓存
      // arg = {id: 'SHELL-ID'}
      .on('cache-clear', (event, arg) => {
        logger.fatal('cache-clear', arg);
        try{
          fs.unlinkSync(path.join(this.cachePath, arg['id']));
          event.returnValue = true;
        }catch(e) {
          event.returnValue = e;
        }
      })
      // 清空所有缓存
      .on('cache-clearAll', (event, arg) => {
        logger.fatal('cache-clearAll', arg);
        try{
          fs.readdirSync(this.cachePath).map((_) => {
            fs.unlinkSync(path.join(this.cachePath, _));
          });
          event.returnValue = true;
        }catch(e) {
          event.returnValue = e;
        }
      })
  }

  createDB(id) {
    // 创建数据库
    return new Datastore({
      filename: path.join(this.cachePath, id),
      autoload: true
    });
  }

}
module.exports = Cache;