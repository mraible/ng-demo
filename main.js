const { app, BrowserWindow, net, protocol } = require('electron');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const browserDir = path.join(__dirname, 'dist/ng-demo/browser');

// Serve the Angular app from app://ng-demo/ so deep links and reloads work like they do on a web server
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true } }
]);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadURL('app://ng-demo/');

  // Uncomment if you want to open Chrome DevTools by default
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  protocol.handle('app', async (request) => {
    const file = path.join(browserDir, decodeURIComponent(new URL(request.url).pathname));
    const isFile = file.startsWith(browserDir + path.sep) && fs.statSync(file, { throwIfNoEntry: false })?.isFile();
    // Return index.html for routes like /search so Angular's router can handle them
    const response = await net.fetch(pathToFileURL(isFile ? file : path.join(browserDir, 'index.html')).toString());
    return new Response(response.body, {
      headers: {
        'Content-Type': response.headers.get('Content-Type'),
        'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'"
      }
    });
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
