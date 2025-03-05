import { UserEntity } from "@/domains/user/user.entity";
import { Meta } from "@/controller/base.controller";

export interface UserPort {
  index(
    page: number,
    perPage: number
  ): Promise<{ data: UserEntity[] | null; meta: Meta | null }>;
  getById(id: string): Promise<UserEntity | null>;
  store(user: UserEntity): Promise<void>;
  update(user: UserEntity): Promise<void>;
  delete(id: string): Promise<UserEntity | null>;
}
