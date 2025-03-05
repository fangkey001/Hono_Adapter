import { Context } from "hono";
import { BaseController } from "../baseController";
import { TransformManager } from "@/application/tranformers/base.transformer";
import { UserTransformer } from "@/application/tranformers/user/user.tranformer";
import { ReasonPhrases } from "@/application/constants/reason-phrases.constant";
import { GetUserAll } from "@/core/domain/use-cases/user/getAllUser";

export class UserController extends BaseController {
  constructor(private getUserAll: GetUserAll) {
    super();
  }

  async index(context: Context) {
    try {
      const { page, perPage } = context.req.param();

      const result = await this.getUserAll.excute({
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
}
