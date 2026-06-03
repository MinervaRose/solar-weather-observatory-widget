const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 560, height: 760, minWidth: 560, maxWidth: 560, minHeight: 760, maxHeight: 760,
    resizable: false, frame: false, transparent: true, backgroundColor: "#00000000",
    alwaysOnTop: false, skipTaskbar: false, hasShadow: true,
    webPreferences: { preload: path.join(__dirname, "preload.js"), contextIsolation: true, nodeIntegration: false }
  });
  mainWindow.loadFile("index.html");
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
ipcMain.handle("widget:close", () => { if (mainWindow) mainWindow.close(); });
ipcMain.handle("widget:minimize", () => { if (mainWindow) mainWindow.minimize(); });
ipcMain.handle("widget:togglePin", () => {
  if (!mainWindow) return false;
  const next = !mainWindow.isAlwaysOnTop();
  mainWindow.setAlwaysOnTop(next, "floating");
  return next;
});