const { app, BrowserWindow, net, protocol, shell } = require('electron');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const appUrl = 'app://ng-demo/';
const browserDir = path.join(__dirname, 'dist/ng-demo/browser');

// Serve the Angular app from app://ng-demo/ so deep links and reloads work like they do on a web server
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true } }
]);

// Open links to other sites in the user's browser instead of in the app's window
function openExternally(url) {
  if (url.startsWith('https://')) shell.openExternal(url);
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith(appUrl)) {
      event.preventDefault();
      openExternally(url);
    }
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    openExternally(url);
    return { action: 'deny' };
  });

  mainWindow.loadURL(appUrl);

  // Uncomment if you want to open Chrome DevTools by default
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  protocol.handle('app', async (request) => {
    const pathname = decodeURIComponent(new URL(request.url).pathname);
    const file = path.join(browserDir, pathname);
    const isFile = file.startsWith(browserDir + path.sep) && fs.statSync(file, { throwIfNoEntry: false })?.isFile();
    // Return 404 for missing files like main-1234.js, and index.html for routes like /search;term=Nikola so
    // Angular's router can handle them
    if (!isFile && /\.[a-z0-9]+$/i.test(pathname) && !pathname.includes(';')) {
      return new Response('Not found', { status: 404 });
    }
    const response = await net.fetch(pathToFileURL(isFile ? file : path.join(browserDir, 'index.html')).toString());
    const headers = new Headers({ 'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline'" });
    const contentType = response.headers.get('Content-Type');
    if (contentType) headers.set('Content-Type', contentType);
    return new Response(response.body, { headers });
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
