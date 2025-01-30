import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/repository/user.repository';
import { CategoryRepository } from '../categories/category.repository';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TestService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async createTester({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    const user = new User();
    user.email = email;
    user.password = password;
    user.name = email.split('@')[0];

    await this.userRepository.createOne(user);
    await this.categoryRepository.createDefaultCategories(user);
  }
}
