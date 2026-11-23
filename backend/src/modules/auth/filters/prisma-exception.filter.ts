import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '../../../generated/prisma/client.js';
import { EmailAlreadyExistException } from '../exceptions/email-already-exist.exception.js';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  constructor(private readonly adapterHost: HttpAdapterHost) {
    super(adapterHost.httpAdapter);
  }

  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    switch (exception.code) {
      case 'P2002': {
        const constraint = (
          exception.meta?.driverAdapterError as
            { cause?: { constraint?: { index?: string } } } | undefined
        )?.cause?.constraint?.index;

        if (constraint === 'User_email_key') {
          super.catch(new EmailAlreadyExistException(), host);
          return;
        }
      }
    }

    super.catch(exception, host);
  }
}
