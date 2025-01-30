import { Module } from '@nestjs/common';
import { CategoryModule } from '../categories/category.module';
import { ContentsModule } from '../contents/contents.module';
import { TestService } from './test.service';
import { UserRepository } from '../users/repository/user.repository';
import { CategoryRepository } from '../categories/category.repository';
import { IsAdminGuard } from './is-admin.guard';
import { TestController } from './test.controller';

@Module({
  imports: [CategoryModule, ContentsModule],
  controllers: [TestController],
  providers: [TestService, UserRepository, CategoryRepository, IsAdminGuard],
})
export class TestModule {}
