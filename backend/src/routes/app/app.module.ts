import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from '../products/products.controller';
import { ProductsModule } from '../products/products.module';
import { UsersController } from '../users/users.controller';
import { UsersModule } from '../users/users.module';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { IngredientsController } from '../ingredients/ingredients.controller';
import { CategoriesController } from '../categories/categories.controller';
import { CategoriesModule } from '../categories/categories.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { OrdersController } from '../orders/orders.controller';
import { OrdersModule } from '../orders/orders.module';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const filename = `${req.params.id}.webp`;
                    cb(null, filename);
                }
            })
        })
    ],
    controllers: [
        AppController,
        ProductsController,
        UsersController,
        IngredientsController,
        CategoriesController,
        OrdersController
    ],
    providers: [
        AppService,
        ProductsModule,
        UsersModule,
        IngredientsModule,
        CategoriesModule,
        OrdersModule
    ]
})
export class AppModule {}
