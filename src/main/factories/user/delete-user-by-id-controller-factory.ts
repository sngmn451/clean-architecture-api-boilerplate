import { DeleteUserByIdController } from '~/interface-adapters/controllers/user/delete-user-by-id-controller';
import { DeleteUserById } from '~/application/use-cases/user/delete-user-by-id';
import {
  deleteUserByIdRepository,
  findUserByIdRepository,
} from '~/infrastructure/repositories/user/user-default-repository';
import { GenericDeletedPresenter } from '~/interface-adapters/presenters/responses/generic/generic-deleted-presenter';

export const deleteUserByIdControllerFactory = () => {
  const deleteUserByIdUseCase = new DeleteUserById(
    deleteUserByIdRepository,
    findUserByIdRepository,
  );
  const deleteUserByIdPresenter = new GenericDeletedPresenter();
  const deleteUserByIdController = new DeleteUserByIdController(
    deleteUserByIdUseCase,
    deleteUserByIdPresenter,
  );

  return {
    deleteUserByIdController,
    deleteUserByIdPresenter,
    deleteUserByIdUseCase,
  };
};
