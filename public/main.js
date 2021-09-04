const path = require('path');
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
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      nativeWindowOpen: true,
      contextIsolation: false,
      backgroundThrottling: false,
    },
  });

  win.loadURL('http://localhost:3000');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows.length === 0) createWindow();
});
