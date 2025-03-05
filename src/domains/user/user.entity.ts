import { User } from "@prisma/client";

export class UserEntity {
  id: number;
  code: string;
  username: string;
  email: string;
  phone_number: string | null;
  created_at: Date;
  updated_at: Date;

  constructor(
    id: number,
    code: string,
    username: string,
    email: string,
    phone_number: string | null,
    created_at: Date,
    updated_at: Date
  ) {
    (this.id = id),
      (this.code = code),
      (this.username = username),
      (this.email = email),
      (this.created_at = created_at);
    this.phone_number = phone_number;
    this.updated_at = updated_at;
  }

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
