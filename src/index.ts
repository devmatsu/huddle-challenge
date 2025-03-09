import server from './server';

const PORT = Number(process.env.PORT) || 3000;

server.start(PORT);
