import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { expect, test as base } from '@playwright/test';

export const test = base.extend({
  // Playwright requires a destructured fixture argument.
  // eslint-disable-next-line no-empty-pattern
  baseURL: async ({}, use) => {
    const server = spawn('ruby', [
      '-rbundler/setup', '-e', "load Gem.bin_path('puma', 'puma')", '--',
      '-C', 'config/puma.rb', '-b', 'tcp://127.0.0.1:0', 'config.ru',
    ], { env: { ...process.env, APP_ENV: 'test' } });
    const closed = new Promise(resolve => server.once('close', resolve));
    let output = '';
    server.stdout.setEncoding('utf8').on('data', chunk => { output += chunk; });
    server.stderr.setEncoding('utf8').on('data', chunk => { output += chunk; });

    try {
      await once(server, 'spawn');
      let url;
      await expect.poll(async () => {
        if (server.exitCode !== null) throw new Error(`Puma stopped: ${output}`);
        url = output.match(/Listening on (http:\/\/127\.0\.0\.1:\d+)/)?.[1];
        if (!url) return false;
        const health = await fetch(`${url}/health`, { signal: AbortSignal.timeout(1000) }).catch(() => null);
        return health?.ok ?? false;
      }, { timeout: 15_000, message: 'Puma should serve /health' }).toBe(true);
      await use(url);
    } finally {
      server.kill();
      await closed;
    }
  },
});
