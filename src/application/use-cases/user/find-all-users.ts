import { FindAllUsersRepository } from '~/application/ports/repositories/user/find-all-users-repository';
import {
  FindAllUsersRequestModel,
  FindAllUsersUseCase,
} from '~/application/ports/use-cases/user/find-all-users-use-case';
import { User } from '~/domain/user/entities/user';

export class FindAllUsers implements FindAllUsersUseCase {
  constructor(
    private readonly findAllUsersRepository: FindAllUsersRepository,
  ) {}

  async findAll(request?: FindAllUsersRequestModel): Promise<User[]> {
    let order: 'desc' | 'asc' = 'desc';
    let limit = 100;
    let offset = 0;

    if (request) {
      if (request.order) order = request.order;
      if (request.limit) limit = request.limit;
      if (request.offset) offset = request.offset;
    }

    const users = await this.findAllUsersRepository.find(order, limit, offset);
    return users;
  }
}
