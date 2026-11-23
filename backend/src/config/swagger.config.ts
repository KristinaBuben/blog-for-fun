import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  private static readonly TITLE = 'BlogForFun API';

  private static readonly DESCRIPTION = 'BlogForFun REST API Documentation';

  private static readonly VERSION = '1.0';

  private static readonly PATH = 'docs';

  static setup(app: INestApplication): void {
    const document = SwaggerConfig.buildDocument(app);
    SwaggerModule.setup(SwaggerConfig.PATH, app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  private static buildDocument(app: INestApplication): OpenAPIObject {
    const config = new DocumentBuilder()
      .setTitle(SwaggerConfig.TITLE)
      .setDescription(SwaggerConfig.DESCRIPTION)
      .setVersion(SwaggerConfig.VERSION)
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          in: 'header',
        },
        'access-token',
      )
      .build();

    return SwaggerModule.createDocument(app, config);
  }
}
