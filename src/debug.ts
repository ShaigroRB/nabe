function getDebugDiv() {
  return document.getElementById('debug') as HTMLDivElement
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debug(a: any) {
  const debugDiv = getDebugDiv()
  if (debugDiv != null) {
    getDebugDiv().textContent = JSON.stringify(a)
  }
}

export function toggleDebug() {
  const debugDiv = getDebugDiv()
  if (debugDiv != null) {
    debugDiv.className = debugDiv.className === '' ? 'invisible' : ''
  }
}
