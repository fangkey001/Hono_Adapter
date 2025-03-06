import { Transformer } from "../baseTransformer";
import { UserEntity } from "@/core/domain/entities/user.entity";

export type UserTransformedResult = {
  id: number;
  code: string;
  username: string;
  email: string;
  phone_number: string | null;
  created_at: Date;
  updated_at: Date;
};

export class UserTransformer extends Transformer<
  UserEntity,
  UserTransformedResult | null
> {
  public async transform(
    model: UserEntity
  ): Promise<UserTransformedResult | null> {
    return {
      id: model.id,
      code: model.code,
      username: model.username,
      email: model.email,
      phone_number: model.phone_number,
      created_at: model.created_at,
      updated_at: model.updated_at,
    };
  }
}
