import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from '../products/products.controller';
import { ProductsModule } from '../products/products.module';
import { UsersController } from '../users/users.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [],
    controllers: [AppController, ProductsController, UsersController],
    providers: [AppService, ProductsModule, UsersModule]
})
export class AppModule {}
