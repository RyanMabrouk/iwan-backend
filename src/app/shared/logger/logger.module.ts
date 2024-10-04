import { LoggerModule as loggerModule } from 'nestjs-pino';
import { Logger, Module } from '@nestjs/common';

@Module({
  imports: [
    loggerModule.forRootAsync({
      useFactory: () => {
        Logger.debug('Logger initialized');
        return {
          pinoHttp: {
            serializers: {
              req: (req) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { headers, body, ...rest } = req;
                return rest;
              },
            },
            customProps: () => ({
              context: 'HTTP',
            }),
            transport: {
              targets: [
                {
                  target: 'pino-pretty',
                  options: {
                    destination: `./logs/output-${new Date().toDateString()}.log`,
                    mkdir: true,
                    colorize: false,
                    singleLine: true,
                  },
                },
                {
                  target: 'pino-pretty',
                  options: {
                    destination: process.stdout.fd,
                    singleLine: true,
                  },
                },
              ],
            },
          },
        };
      },
    }),
  ],
})
export class LoggerModule {}
