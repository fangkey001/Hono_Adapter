import { UserEntity } from "@/core/domain/entities/user.entity";
import { Result } from "@/core/domain/use-cases/baseUseCase";
import { Meta } from "@/application/controllers/baseController";

export interface IUserRepository {
  index(page: number, perPage: number): Promise<Result<UserEntity[], Meta>>;
  //   findById(id: string): Promise<UserEntity | null>;
  //   create(todo: UserEntity): Promise<UserEntity>;
  //   update(todo: UserEntity): Promise<UserEntity>;
  //   delete(id: string): Promise<void>;
}
