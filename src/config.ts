import 'dotenv/config';

export const config = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT || '3000',
  database: {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  storage: {
    path: './storages',
  },
  jwt: {
    tokenSecret: process.env.JWT_TOKEN_SECRET,
    tokenExpire: process.env.JWT_TOKEN_EXPIRE,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpire: process.env.JWT_REFRESH_EXPIRE,
  },
  email: {
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    user: '453950ba95fb76',
    pass: '83cbb1f3975fe7',
  },
};
