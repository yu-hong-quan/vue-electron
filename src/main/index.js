import { app, BrowserWindow, Menu,ipcMain ,Tray} from "electron";

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

let mainWindow;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
  // 隐藏菜单栏
  Menu.setApplicationMenu(null);
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    frame: false, /*去掉顶部导航 去掉关闭按钮 最大化最小化按钮*/
    useContentSize: true,
    allowRunningInsecureContent: true,
    experimentalCanvasFeatures: true,
    icon: require("path").join(__dirname, '../../build/icons/HTMLicon.png'), // icon
    resizable: true,//可否缩放
    movable: true//可否移动
  });
  mainWindow.loadURL(winURL);
  mainWindow.on("closed", function() {
    mainWindow = null;
  });

  // 设置系统托盘图标
}

app.on("ready", () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  // }
  // 设置托盘
  const tray = new Tray(require("path").join(__dirname, '../../build/icons/HTMLicon.png'))
  // 设置托盘菜单
  const trayContextMenu = Menu.buildFromTemplate([
    {
      label: '打开',
      click: () => {
        win.show()
      }
    } ,{
      label: '最大/最小化',
      click: () => {
        if (mainWindow.isMaximized()) {
          mainWindow.restore();
        } else {
          mainWindow.maximize();
        }
      }
    }, {
      label: '退出',
      click: () => {
        app.quit()
      }
    },
  ])
  tray.setToolTip('余山郡')
  tray.on('click', () => {
    win.show()
  })
  tray.on('right-click', () => {
    tray.popUpContextMenu(trayContextMenu)
  })
  // 创建渲染窗口
  createWindow()
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});


//窗口设置
ipcMain.on('window-min', function () {
  mainWindow.minimize();
})
//登录窗口最大化 
ipcMain.on('window-max', function () {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
})
ipcMain.on('window-close', function () {
  mainWindow.close();
})

