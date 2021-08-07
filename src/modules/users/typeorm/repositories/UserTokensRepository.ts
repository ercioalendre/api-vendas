import { EntityRepository, Repository } from "typeorm";
import UserToken from "@UsersEntities/UserToken";

@EntityRepository(UserToken)
class UserTokensRepository extends Repository<UserToken> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async findByToken(token: string): Promise<UserToken | any> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async generate(user_id: string): Promise<UserToken | any> {
    const userToken = await this.create({
      user_id,
    });
    await this.save(userToken);
    return userToken;
  }
}

export default UserTokensRepository;
