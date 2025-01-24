import * as admin from 'firebase-admin';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';

async function bootstrap() {
 
  admin.initializeApp({
    credential: admin.credential.cert(path.join(__dirname, 'firebase', 'firebase-service-account.json')),  
    databaseURL: 'https://lumin-947a2.firebaseio.com', 
  });

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
