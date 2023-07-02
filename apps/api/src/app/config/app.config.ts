

interface ServerConfig {
    port: number;
    env: string;
    prefix: string;

}

interface AppConfig {
    server: ServerConfig,
}


export default (): AppConfig => ({

    server: {
        port: parseInt(process.env.APP_PORT) || 3000,
        env: process.env.APP_ENV || 'development',
        prefix: process.env.APP_PREFIX || 'api',
    }
})