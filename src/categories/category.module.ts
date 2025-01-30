import { Module } from '@nestjs/common';
import { ContentsModule } from '../contents/contents.module';
import { CategoryService } from './category.service';
import { OpenaiModule } from '../openai/openai.module';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryController } from './category.controller';
import { ContentRepository } from '../contents/repository/content.repository';
import { CategoryRepository } from './category.repository';
import { CategoryV2Controller } from './v2/category.v2.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    ContentsModule,
    OpenaiModule,
    UsersModule,
  ],
  controllers: [CategoryController, CategoryV2Controller],
  providers: [CategoryService, ContentRepository, CategoryRepository],
  exports: [CategoryRepository, CategoryService],
})
export class CategoryModule {}
