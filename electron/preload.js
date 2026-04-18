const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  isElectron: true,

  whisper: {
    getKey: () => ipcRenderer.invoke("whisper:getKey"),
    setKey: (key) => ipcRenderer.invoke("whisper:setKey", key),
    transcribe: (audioBase64) => ipcRenderer.invoke("whisper:transcribe", audioBase64),
  },

  video: {
    selectFile: (opts) => ipcRenderer.invoke("video:selectFile", opts),
    selectMultiple: () => ipcRenderer.invoke("video:selectMultiple"),
    registerPath: (id, filePath) => ipcRenderer.invoke("video:registerPath", id, filePath),
  },

  videoDirs: {
    get: () => ipcRenderer.invoke("videoDirs:get"),
    getResolved: () => ipcRenderer.invoke("videoDirs:getResolved"),
    add: () => ipcRenderer.invoke("videoDirs:add"),
    remove: (dir) => ipcRenderer.invoke("videoDirs:remove", dir),
    checkFiles: (filenames) => ipcRenderer.invoke("videoDirs:checkFiles", filenames),
  },

  srt: {
    readFile: (filePath) => ipcRenderer.invoke("srt:readFile", filePath),
  },

  autoTranscribe: {
    run: (videoFilePath, groqKey) => ipcRenderer.invoke("autoTranscribe:run", videoFilePath, groqKey),
    resolveVideoPath: (filename) => ipcRenderer.invoke("autoTranscribe:resolveVideoPath", filename),
    resolveUserVideoPath: (lessonId) => ipcRenderer.invoke("autoTranscribe:resolveUserVideoPath", lessonId),
  },

  groqKey: {
    get: () => ipcRenderer.invoke("groqKey:get"),
    set: (key) => ipcRenderer.invoke("groqKey:set", key),
  },

  userLessons: {
    getAll: () => ipcRenderer.invoke("userLessons:getAll"),
    save: (lesson) => ipcRenderer.invoke("userLessons:save", lesson),
    delete: (lessonId) => ipcRenderer.invoke("userLessons:delete", lessonId),
  },

  window: {
    toggleFullscreen: () => ipcRenderer.invoke("window:toggleFullscreen"),
    isFullscreen: () => ipcRenderer.invoke("window:isFullscreen"),
  },
});
