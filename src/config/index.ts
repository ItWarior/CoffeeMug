import * as dotenv from 'dotenv';
import log from '../utils/logger.util';

dotenv.config();

const config = {
  dbConnectionString: process.env.DB_CONNECT_URL,
  port: process.env.PORT,
};

log.info(`Configuration was loaded`);

export default config;
