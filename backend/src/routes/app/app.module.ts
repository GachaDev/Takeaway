import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from '../products/products.controller';
import { ProductsModule } from '../products/products.module';
import { UsersController } from '../users/users.controller';
import { UsersModule } from '../users/users.module';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { IngredientsController } from '../ingredients/ingredients.controller';

@Module({
    imports: [],
    controllers: [AppController, ProductsController, UsersController, IngredientsController],
    providers: [AppService, ProductsModule, UsersModule, IngredientsModule]
})
export class AppModule {}
