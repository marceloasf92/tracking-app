import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { OrdersModule } from './modules/orders/orders.module';
import { LoginModule } from './modules/login/login.module';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { OrdersController } from './modules/orders/orders.controller';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/global-exception.filter';

@Module({
  imports: [UsersModule, PrismaModule, OrdersModule, LoginModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(OrdersController);
  }
}
