const path = require('path');
const isDev = require('electron-is-dev');
const { app, BrowserWindow } = require('electron');

require('@electron/remote/main').initialize();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    darkTheme: true,
    title: 'Scrumboard',
    icon: path.join(__dirname, './', 'icon.png'),
    webPreferences: {
      plugins: true,
      webSecurity: true,
      enableRemoteModule: true,
      nativeWindowOpen: true,
      nodeIntegration: true,
      contextIsolation: false,
      backgroundThrottling: false,
    },
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '.../build/index.html')}`,
  );
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows.length === 0) createWindow();
});
