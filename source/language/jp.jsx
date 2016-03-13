//
// language::jp
// !warning: 此模板并未完全翻译完毕，如若加载可能出错。解决办法：复制`en.jsx`模板然后翻译替换。。
// 
module.exports = {
  toastr: {
    info: 'プロンプト',
    error: '間違いました',
    warning: '警告の',
    success: 'サクセス'
  },
  menubar: {
    main: {
      title: 'antSword',
      about: 'プログラムについて',
      update: '更新プログラムの確認',
      quit: 'プログラムを終了'
    },
    shell: {
      title: 'データ',
      add: 'データを追加します',
      dump: 'データのエクスポート',
      import: 'データのインポート',
      clear: 'データを消去'
    },
    edit: {
      title: 'エディタ',
      undo: '失効',
      redo: 'やり直し',
      cut: 'シャー',
      copy: 'コピー',
      paste: 'スティック',
      selectall: '全て選択'
    },
    settings: {
      title: 'セットアップ',
      language: {
        title: '表示言語',
        zh: '简体中文',
        en: 'English'
      }
    },
    debug: {
      title: 'デバッグ作業',
      refresh: 'リフレッシュ',
      dev: '開発者ツール'
    }
  },
  shellmanager: {
    title: 'リストの管理',
    contextmenu: {
      terminal: '仮想ターミナル',
      filemanager: 'ファイル管理',
      database: 'データ操作',
      add: 'データを追加します',
      edit: 'データの編集',
      delete: 'データの削除',
      move: 'モバイルデータ',
      search: '検索データ',
      plugin: 'ロードプラグイン',
      clearCache: 'キャッシュを空に',
      clearAllCache: 'すべてクリアキャッシュ'
    },
    category: {
      title: 'カテゴリー',
      default: 'デフォルト',
      toolbar: {
        add: '追加',
        del: '削除'
      },
      add: {
        title: 'カテゴリを追加します'
      },
      del: {
        title: 'カテゴリを削除',
        confirm: 'まだこのカテゴリーを削除してください？ （データはクリアされます）',
        success: (category) => `カテゴリは正常に削除（${category}）！`,
        error: (category, err) => `カテゴリを削除（${category}）失敗！<br/>${err}`
      }
    },
    list: {
      title: 'データ管理',
      grid: {
        url: 'URLアドレス',
        ip: 'IPアドレス',
        addr: '物理的な位置',
        ctime: '作成',
        utime: '更新'
      },
      add: {
        title: 'データを追加します',
        toolbar: {
          add: '追加',
          clear: '明確な'
        },
        form: {
          url: 'URLアドレス',
          pwd: '接続パスワード',
          encode: 'エンコーディング設定',
          type: '接続タイプ',
          encoder: 'エンコーダ'
        },
        warning: 'フルを入力してください！',
        success: 'データの成功を追加！',
        error: (err) => `データの追加に失敗しました！<br/>${err}`
      },
      edit: {
        title: (url) => `データの編集（${url}）`,
        toolbar: {
          save: '保存',
          clear: '明確な'
        },
        form: {
          url: 'URLアドレス',
          pwd: '接続パスワード',
          encode: 'エンコーディング設定',
          type: '接続タイプ',
          encoder: 'エンコーダ'
        },
        warning: 'フルを入力してください！',
        success: 'データの更新成功！',
        error: (err) => `更新データに失敗しました！<br/>${err}`
      },
      del: {
        title: 'データの削除',
        confirm: (len) => `選択された${len}記事のデータを削除してください？`,
        success: (len) => `${len}正常に削除されたデータ！`,
        error: (err) => `削除に失敗しました！<br/>${err}`
      },
      move: {
        success: (num) => `データが正常に${num}を移動しました！`,
        error: (err) => `モバイルデータに失敗しました！<br/>${err}`
      },
      clearCache: {
        title: 'キャッシュを空に',
        confirm: 'OKキャッシュを空？',
        success: 'キャッシュを空にするには、準備ができています！',
        error: (err) => `空のキャッシュに失敗しました！<br/>${err}`
      },
      clearAllCache: {
        title: 'キャッシュを空に',
        confirm: '[OK]をクリアし、すべてのデータをキャッシュされましたか？',
        success: '空のキャッシュ全体が終了！',
        error: (err) => `空のキャッシュ全体が失敗しました！<br/>${err}`
      }
    }
  },
  terminal: {
    title: '仮想ターミナル',
    banner: {
      title: '基本情報',
      drive: 'ディスクリスト',
      system: 'システム情報',
      user: '現在のユーザー',
      path: '現在パス'
    }
  },
  filemanager: {
    title: 'ファイル管理',
    delete: {
      title: 'ファイルを削除します',
      confirm: (num) => `あなたは${typeof(num) === 'number' ? num + ' 个文件' : num}のファイルを削除してもよろしいですか？`,
      success: (path) => `ファイルの成功を削除！<br/>${path}`,
      error: (path, err) => `ファイル[${path}]を削除できませんでした！${err ? '<br/>' + err : ''}`
    },
    paste: {
      success: (path) => `ファイルの成功を貼り付け！<br/>${path}`,
      error: (path, err) => `貼り付けファイル[${path}]が失敗しました！${err ? '<br/>' + err : ''}`
    },
    rename: {
      title: '名前の変更',
      success: 'ファイルの成功の名前を変更します！',
      error: (err) => `失敗したファイルの名前を変更します！${err ? '<br/>' + err : ''}`
    },
    createFolder: {
      title: '新規カタログ',
      value: '新しいディレクトリ',
      success: (path) => `新規カタログの成功！<br/>${path}`,
      error: (path, err) => `新しいディレクトリ[${path}]は失敗しました！${err ? '<br/>' + err : ''}`
    },
    createFile: {
      title: '新しいファイル',
      value: '新しいファイル.txt',
      success: (path) => `新規ファイルの成功！<br/>${path}`,
      error: (path, err) => `新しいファイル[${path}]は失敗しました！${err ? '<br/>' + err : ''}`
    },
    retime: {
      title: '時間を変更します',
      success: (path) => `ファイルの時間の成功を変更！<br/>${path}`,
      error: (path, err) => `変更文書[${path}]は失敗しました！${err ? '<br/>' + err : ''}`
    },
    wget: {
      title: 'Wgetのダウンロードファイル',
      check: 'URLアドレスが正しくありません！',
      task: {
        name: 'WGETダウンロード',
        start: 'ダウンロードを開始します..',
        success: '成功をダウンロード！',
        failed: (ret) => `失敗:${ret}`,
        error: (err) => `間違いました:${err}`
      }
    },
    upload: {
      task: {
        name: 'アップロード',
        failed: (err) => `失敗:${err}`,
        error: (err) => `間違いました:${err}`
      },
      success: (path) => `ファイルの成功をアップロード！<br/>${path}`,
      error: (path, err) => `ファイルをアップロードし、[${path}]は失敗しました！${err}`,
    },
    folder: {
      title: 'ディレクトリのリスト'
    },
    files: {
      title: 'ファイルリスト',
      bookmark: {
        add: 'ブックマークに追加',
        del: 'ブックマークを削除します',
        clear: 'クリアしおり'
      },
      toolbar: {
        new: '新',
        folder: 'ディレクトリ',
        file: 'ファイル',
        wget: 'Wgetのダウンロード',
        upload: 'アップロード',
        up: '上層',
        refresh: '晴らす',
        home: 'ホーム',
        bookmark: 'マーク',
        read: '読みます'
      },
      prompt: {
        add: {
          title: 'ブックマークに追加',
          success: (path) => `ブックマークの成功を追加！<br/>${path}`,
        },
        remove: {
          title: 'ブックマークを削除します',
          confirm: 'このブックマークを削除してください？',
          success: 'ブックマークの成功を削除します！'
        },
        clear: {
          title: 'クリアしおり',
          confirm: '[OK]をクリアすべてのブックマーク？',
          success: 'すべてのブックマークの成功クリア！'
        }
      },
      grid: {
        header: {
          name: '名前',
          time: '期日',
          size: 'サイズ',
          attr: 'プロパティ'
        },
        contextmenu: {
          paste: {
            title: 'ファイルの貼り付け',
            all: 'すべてのリスト',
            clear: {
              title: '一覧をクリアします',
              info: '空のクリップボード'
            }
          },
          preview: 'プレビュードキュメント',
          edit: 'ファイルを編集します',
          delete: 'ファイルを削除します',
          rename: 'ファイル名の変更',
          refresh: 'ディレクトリを更新',
          wget: 'WGETダウンロード',
          upload: 'ファイルをアップロード',
          download: 'ファイルのダウンロード',
          modify: '変更ファイルの時間',
          copy: {
            title: 'ファイルのコピー',
            warning: (id) => `これは、クリップボードに追加されました！<br/>${id}`,
            info: (id) => `クリップボードにファイルを追加します。<br/>${id}`
          },
          create: {
            title: '新',
            folder: 'ディレクトリ',
            file: 'ファイル'
          }
        }
      }
    },
    editor: {
      title: (path) => `エディタ: ${path}`,
      toolbar: {
        save: '保存',
        mode: 'ハイライト',
        encode: 'コーディング'
      },
      loadErr: (err) => `読み込みエラーファイル！<br/>${err}`,
      success: (path) => `ファイルの成功を節約！<br/>${path}`,
      error: (path, err) => `ファイルを保存し、[${path}]に失敗しました！${err}`
    },
    tasks: {
      title: 'タスクリスト',
      grid: {
        header: {
          name: '名前',
          desc: '簡単な紹介',
          status: '地位',
          stime: '作成',
          etime: '完了時間'
        }
      }
    },
    download: {
      title: 'ファイルのダウンロード',
      task: {
        name: 'ダウンロード',
        wait: 'ダウンロードするための準備',
        cancel: 'ダウンロードをキャンセル',
        start: 'ダウンロードを開始します',
        success: '成功をダウンロード',
        error: (err) => `エラー:${err}`
      },
      error: (name, err) => `ファイルのダウンロード[${path}]エラー！<br/>${err}`,
      success: (name) => `ファイルのダウンロード[${path}]成功！`
    }
  }
}