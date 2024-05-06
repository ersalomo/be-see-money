import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import * as basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationFilter } from './validation/validation.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ValidationFilter());
  // app.use(
  //   // Paths you want to protect with basic auth
  //   '/api/docs-sweagger/*',
  //   basicAuth({
  //     challenge: true,
  //     users: { admin: 'admin' },
  //   }),
  // );
  const config = new DocumentBuilder()
    // .setTitle('Cats example')
    // .setDescription('The cats API description')
    // .setVersion('1.0')
    // .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs-sweagger', app, document);
  // app.use(cookieParser('my-cooki'));
  await app.listen(3000);
}
bootstrap();
