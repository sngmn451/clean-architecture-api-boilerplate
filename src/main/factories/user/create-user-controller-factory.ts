import { CreateUserController } from '~/interface-adapters/controllers/user/create-user-controller';
import { CreateUser } from '~/application/use-cases/user/create-user';
import { BCryptAdapter } from '~/common/adapters/validators/bcrypt-adapter';
import {
  createUserRepository,
  findUserByEmailRepository,
} from '~/infrastructure/repositories/user/user-default-repository';
import { GenericCreatedPresenter } from '~/interface-adapters/presenters/responses/generic/generic-created-presenter';
import { User } from '~/domain/user/entities/user';

export const createUserControllerFactory = () => {
  const bcryptAdapter = new BCryptAdapter();
  const createUserUseCase = new CreateUser(
    createUserRepository,
    findUserByEmailRepository,
    bcryptAdapter,
  );
  const createdUserPresenter = new GenericCreatedPresenter<User>();
  const createUserController = new CreateUserController(
    createUserUseCase,
    createdUserPresenter,
  );

  return {
    createUserRepository,
    bcryptAdapter,
    createUserUseCase,
    createdUserPresenter,
    createUserController,
  };
};
