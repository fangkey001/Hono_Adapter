import { Meta } from "@/application/controllers/baseController";
import { Result, UseCase } from "../baseUseCase";
import { UserEntity } from "../../entities/user.entity";
import { IUserRepository } from "@/core/repositories/user/userRepository";

interface IPayload {
  page: number;
  perPage: number;
}

export class GetUserAll extends UseCase<IPayload, UserEntity[], Meta | null> {
  constructor(private userRepository: IUserRepository) {
    super();
  }

  async excute(payload: IPayload): Promise<Result<UserEntity[], Meta>> {
    const user = await this.userRepository.index(payload.page, payload.perPage);

    return this.success({
      data: user.data ?? [],
      meta: user.meta ?? null,
    });
  }
}
