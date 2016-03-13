// 
// 检查更新
// 

const LANG = antSword['language']['settings']['update'];

class Update {
  constructor(sidebar) {
    sidebar.addItem({
      id: 'update',
      text: `<i class="fa fa-cloud-download"></i> ${LANG['title']}`
    });
    const cell = sidebar.cells('update');

    // toolbar
    const toolbar = cell.attachToolbar();
    toolbar.loadStruct([
      { id: 'check', type: 'button', text: LANG['toolbar']['check'], disabled: true, icon: 'check-square-o' },
      { type: 'separator' }
    ]);

    // status
    cell.attachHTMLString(`

      当前版本：1.0.0
      <br/>
      暂不支持在线更新！
      <br />
      请访问<strong style="color:#0099FF">https://github.com/antoor/antSword</strong>获取最新版本！
    `);
  }
}

export default Update;