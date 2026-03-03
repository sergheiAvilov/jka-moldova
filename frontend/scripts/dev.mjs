import { createConnection } from 'net';
import { createServer as createViteServer } from 'vite';

function isPortInUse(port) {
  return new Promise((resolve) => {
    const socket = createConnection(port, '127.0.0.1');
    socket.once('connect', () => { socket.destroy(); resolve(true); });
    socket.once('error', () => { socket.destroy(); resolve(false); });
  });
}

async function findFreePort(port) {
  if (await isPortInUse(port)) {
    console.log(`Port ${port} is in use, trying ${port + 1}...`);
    return findFreePort(port + 1);
  }
  return port;
}

const port = await findFreePort(3000);
console.log(`Starting Vite on port ${port}...`);

const vite = await createViteServer({ server: { port } });
await vite.listen();
vite.printUrls();
