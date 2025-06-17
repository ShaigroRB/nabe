const debugDiv = document.getElementById('debug') as HTMLDivElement
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debug(a: any) {
  debugDiv.textContent = JSON.stringify(a)
}

export function toggleDebug() {
  debugDiv.className = debugDiv.className === '' ? 'invisible' : ''
}
