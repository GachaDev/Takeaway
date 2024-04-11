import { NestFactory } from '@nestjs/core';
import { AppModule } from './routes/app/app.module';
import { AppDataSource } from './components/db/dataSource';

(async () => {
    await AppDataSource.initialize();

    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: '*' });

    await app.listen(process.env.PORT || 4000);
    console.log(`Application running at ${await app.getUrl()}`);
})();
