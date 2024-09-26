import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    POSTGRES_USER: get('POSTGRES_USER').required().asString(),
    MAILER_EMAIL:get('MAILER_EMAIL').required().asEmailString(),
    MAIL_SECRET_KEY:get('MAIL_SECRET_KEY').required().asString(),
    MAILER_SERVICE:get('MAILER_SERVICE').required().asString(),
    POSTGRES_DB: get('POSTGRES_DB').required().asString(),
    POSTGRES_PORT: get('POSTGRES_PORT').required().asPortNumber(),
    POSTGRES_PASSWORD: get('POSTGRES_PASSWORD').required().asString(),
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    POSTGRES_HOST: get('POSTGRES_HOST').required().asString()
}



