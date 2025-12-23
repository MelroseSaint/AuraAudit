// Mock Electron API for web builds
// This provides no-op implementations so that web app doesn't crash

export const electronAPI = {
  // App updates
  getAppVersion: () => Promise.resolve('2.7.1'),
  onAppUpdateAvailable: () => () => {},
  onAppUpdateDownloaded: () => () => {},
  onProactiveSwapNotification: () => () => {},

  // Project management
  getDefaultProjectLocation: () => Promise.resolve(''),
  selectDirectory: () => Promise.reject(new Error('Not available in web')),
  detectMainBranch: () => Promise.reject(new Error('Not available in web')),
  updateProjectSettings: () => Promise.reject(new Error('Not available in web')),
  createProjectFolder: () => Promise.reject(new Error('Not available in web')),

  // Task progress and errors
  onTaskProgress: () => () => {},
  onTaskError: () => () => {},

  // Other common Electron APIs
  saveRoadmap: () => Promise.reject(new Error('Not available in web')),
  openExternal: () => {},
  showItemInFolder: () => {},

  // Agent IPC
  runAgent: () => Promise.reject(new Error('Not available in web')),
  stopAgent: () => Promise.reject(new Error('Not available in web')),
  getAgentStatus: () => Promise.resolve({ status: 'idle' })
}

// Make available globally like Electron preload does
if (typeof window !== 'undefined') {
  ;(window as any).electronAPI = electronAPI
}
