import { Result } from "@/core/domain/use-cases/baseUseCase";
import { BaseRepository } from "../baseRepository";
import { Meta } from "../../application/controllers/baseController";
import { ErrorHandler } from "@/application/utils/errorHandler.util";
import { IUserRepository } from "@/core/repositories/user/userRepository";
import { UserEntity } from "@/core/domain/entities/user.entity";

export class UserRepositoryImpl implements IUserRepository {
  private userRepository = new BaseRepository<UserEntity>("user");

  async index(
    page: number,
    perPage: number
  ): Promise<Result<UserEntity[], Meta>> {
    try {
      const { data, total } = await this.userRepository.paginate(page, perPage);

      return {
        success: true,
        data: data,
        meta: Meta.fromPagination(total, page, perPage),
      };
    } catch (error) {
      const errorDetails = ErrorHandler.handle(error);

      return ErrorHandler.toResult<UserEntity[]>(errorDetails);
    }
  }

  //   async findById(id: string): Promise<UserEntity | null> {}

  //   async create(todo: UserEntity): Promise<UserEntity> {}

  //   async update(todo: UserEntity): Promise<UserEntity> {}

  //   async delete(id: string): Promise<void> {}
}
