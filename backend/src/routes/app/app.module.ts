import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from '../products/products.controller';
import { ProductsModule } from '../products/products.module';

@Module({
    imports: [],
    controllers: [AppController, ProductsController],
    providers: [AppService, ProductsModule]
})
export class AppModule {}
