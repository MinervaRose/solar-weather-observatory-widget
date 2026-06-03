const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("solarWidget", {
  close: () => ipcRenderer.invoke("widget:close"),
  minimize: () => ipcRenderer.invoke("widget:minimize"),
  togglePin: () => ipcRenderer.invoke("widget:togglePin")
});