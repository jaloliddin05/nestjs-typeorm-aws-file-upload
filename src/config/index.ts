import * as dotenv from 'dotenv';

import { IConfig } from './config.interface';

dotenv.config();

export default (): IConfig => ({
  port: parseInt(process.env.PORT, 10) || 8000,

  database: {
    host: process.env.DB_HOST,
    type: process.env.DB_TYPE,
    name: 'default',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    synchronize: true,

    migrationsRun: false,

    logging: false,
    autoLoadEntities: true,
    entities: ['./dist/**/*.entity.js'],
    migrations: ['dist/migrations/scripts/*.js'],
    cli: {
      migrationsDir: 'src/migrations/scripts',
    },
  },

  awsS3: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET,
    acl: process.env.AWS_ACL,
  },

  newPasswordBytes: 4,
  codeBytes: 2,
});
