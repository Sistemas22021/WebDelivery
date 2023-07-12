

interface ServerConfig {
    port: number;
    env: string;
    prefix: string;

}

interface DBConfig {
    user: string;
    password: string;
    database: string;
    host: string;
}

interface AppConfig {
    server: ServerConfig,
    database: DBConfig
}



export default (): AppConfig => ({

    server: {
        port: parseInt(process.env.APP_PORT) || 3000,
        env: process.env.APP_ENV || 'development',
        prefix: process.env.APP_PREFIX || 'api',
    },
    database: {
        database: process.env.DATABASE,
        host: process.env.DATABASE_HOST,
        password: process.env.DATABASE_PASSWORD,
        user: process.env.DATABASE_USER
    }
})