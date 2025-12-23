export class TerminalBufferManager {
  private buffers: Map<string, string[]> = new Map()

  getBuffer(key: string): string[] {
    return this.buffers.get(key) || []
  }

  setBuffer(key: string, data: string[]): void {
    this.buffers.set(key, data)
  }

  appendToBuffer(key: string, data: string): void {
    const buffer = this.buffers.get(key) || []
    buffer.push(data)
    this.buffers.set(key, buffer)
  }

  clearBuffer(key: string): void {
    this.buffers.delete(key)
  }
}

export const terminalBufferManager = new TerminalBufferManager()
