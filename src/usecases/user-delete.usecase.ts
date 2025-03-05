import { UserEntity } from "@/domains/user/user.entity";
import { Result, UseCase } from "@/utils/base.usecase";
import { UserPort } from "@/ports/user/user.port";

interface IPayload {
  code: string;
}

export class DeleteUser extends UseCase<IPayload, UserEntity, null> {
  constructor(private readonly userPort: UserPort) {
    super();
  }

  async excute(payload: IPayload): Promise<Result<UserEntity, null>> {
    const user = await this.userPort.delete(payload.code);

    if (!user) {
      return this.error({
        error: {
          code: "USER_NOT_FOUND",
          message: "User not found",
          status: 404,
        },
      });
    }

    return this.success({
      data: user,
      meta: null,
    });
  }
}
