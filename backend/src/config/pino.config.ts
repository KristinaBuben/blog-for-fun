import { Params } from 'nestjs-pino';
import pino from 'pino';

const isDev =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'local';

export const pinoConfig = (): Params => ({
  pinoHttp: {
    level: process.env.LOG_LEVEL || 'info',
    serializers: {
      err: pino.stdSerializers.err,
    },
    ...(isDev && {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          singleLine: false,
          translateTime: 'SYS:standard',
          ignore: 'pid, hostname',
        },
      },
    }),
  },
});
