import { getCustomRepository } from "typeorm";
import UsersRepository from "@UsersRepositories/UsersRepository";
import User from "@UsersEntities/UserEntity";

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const usersData = users.map(({ password, ...users }) => users);

    return usersData as User[];
  }
}

export const listUserService = new ListUserService();
export default listUserService;
