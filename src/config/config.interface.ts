interface IDatabase {
  host: string;
  type: string;
  name: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
  synchronize: boolean;

  migrationsRun?: boolean;
  logging?: boolean;
  autoLoadEntities?: boolean;
  migrations?: string[];
  cli?: {
    migrationsDir?: string;
  };
}

interface IAwsS3 {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
  acl: string;
}

export interface IConfig {
  port: number;
  database: IDatabase;
  newPasswordBytes: number;
  awsS3: IAwsS3;
  codeBytes: number;
}
