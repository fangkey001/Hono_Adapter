import { Context } from "hono";
import { BaseController } from "../base.controller";
import { UserRepository } from "@/repositories/user/user.repository";
import { GetUserById } from "@/usecases/user-by-id.usecase";
import { ReasonPhrases } from "@/constants/reason-phrases.constant";
import { TransformManager } from "@/tranformers/base.transformer";
import { UserTransformer } from "@/tranformers/user/user.tranformer";
import { GetUserAll } from "@/usecases/user-get-all.usecase";

const userRepository = new UserRepository();
const getUserById = new GetUserById(userRepository);
const getUserAll = new GetUserAll(userRepository);

export class UserController extends BaseController {
  async index(context: Context) {
    try {
      const { page, perPage } = context.req.param();

      const result = await getUserAll.excute({
        page: Number(page) || 1,
        perPage: Number(perPage) || 10,
      });

      if (result.success && result.data) {
        const transformerUsers = await TransformManager.collection(
          result.data,
          UserTransformer
        );

        return this.successResponse(
          context,
          transformerUsers,
          ReasonPhrases.OK,
          200,
          result.meta
        );
      }
    } catch (error) {
      return this.errorResponse(context, "Failed to fetch users");
    }
  }

  async getById(context: Context) {
    try {
      const id = context.req.param("id");

      const result = await getUserById.excute({ id });

      if (result.success) {
        const transformerUser = await TransformManager.item(
          result.data,
          UserTransformer
        );

        return this.successResponse(
          context,
          transformerUser,
          ReasonPhrases.OK,
          200
        );
      } else {
        return this.errorResponse(context, result.message, result.status);
      }
    } catch (error) {
      return this.errorResponse(context, "Failed to fetch user");
    }
  }
}
