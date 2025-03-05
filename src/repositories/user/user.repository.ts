import { BaseRepository } from "../base-repository";
import { UserPort } from "@/ports/user/user.port";
import { UserEntity } from "@/domains/user/user.entity";
import { prisma } from "../../configs/database";
import { Meta } from "@/controller/base.controller";

export class UserRepository implements UserPort {
  private userRepository = new BaseRepository<UserEntity>("user");

  async index(
    page: number,
    perPage: number
  ): Promise<{ data: UserEntity[] | null; meta: Meta }> {
    const { data, total } = await this.userRepository.paginate(page, perPage);

    return {
      data: data,
      meta: Meta.fromPagination(total, page, perPage),
    };
  }

  async getById(code: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({ where: { code } });

    return user ? UserEntity.fromPrisma(user) : null;
  }

  async store(user: UserEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async update(user: UserEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(code: string): Promise<UserEntity | null> {
    const user = await prisma.user.delete({ where: { code: code } });

    return user ? UserEntity.fromPrisma(user) : null;
  }
}
