import { IConfig } from './interfaces/IConfig';
let config: IConfig = {
    port: 3000,
    cors: true,
    pushService: 'http://localhost:3001'
};

export default config;