export async function updateHealthStatus(statusElement) {
  try {
    const response = await fetch('/health');
    if (!response.ok) throw new Error('Health check failed');

    const health = await response.json();
    statusElement.textContent = health.status === 'ok' ? 'Online' : 'Unavailable';
  } catch {
    statusElement.textContent = 'Unavailable';
  }
}
