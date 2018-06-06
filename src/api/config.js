
const host = process.env.host ? process.env.host : 'http://localhost';
const basePath = 'api';
const port = 3001;

export const endPoint = `${host}:${port}/${basePath}`;