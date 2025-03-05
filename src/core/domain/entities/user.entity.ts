import { User } from "@prisma/client";

export class UserEntity {
  constructor(
    public id: number,
    public code: string,
    public username: string,
    public email: string,
    public phone_number: string | null,
    public created_at: Date,
    public updated_at: Date
  ) {}

  static fromPrisma(user: User): UserEntity {
    return new UserEntity(
      user.id,
      user.code,
      user.username,
      user.email,
      user.phoneNumber,
      user.createdAt,
      user.updatedAt
    );
  }
}
