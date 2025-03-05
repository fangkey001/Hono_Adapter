import { UserEntity } from "@/domains/user/user.entity";
import { Result, UseCase } from "../base.usecase";
import { Meta } from "@/controller/base.controller";
import { UserPort } from "@/ports/user/user.port";

interface IPayload {
  page: number;
  perPage: number;
}

export class GetUserAll extends UseCase<IPayload, UserEntity[], Meta | null> {
  constructor(private readonly userPort: UserPort) {
    super();
  }

  async excute(payload: IPayload): Promise<Result<UserEntity[], Meta>> {
    const user = await this.userPort.index(payload.page, payload.perPage);

    return this.success({
      data: user.data ?? [],
      meta: user.meta ?? null,
    });
  }
}
