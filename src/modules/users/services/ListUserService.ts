import { getCustomRepository } from "typeorm";
import UsersRepository from "@UsersRepositories";
import User from "@UsersEntities";

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.find();

    return users;
  }
}

export default ListUserService;
