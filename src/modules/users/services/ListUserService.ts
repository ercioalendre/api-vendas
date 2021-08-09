import { getCustomRepository } from "typeorm";
import UsersRepository from "@UsersRepositories/UsersRepository";
import User from "@UsersEntities/User";

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.find();

    return users;
  }
}

export const listUserService = new ListUserService();
export default listUserService;
