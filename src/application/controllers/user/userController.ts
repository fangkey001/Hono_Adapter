import { Context } from "hono";
import { BaseController } from "../baseController";
import { TransformManager } from "@/application/tranformers/baseTransformer";
import { UserTransformer } from "@/application/tranformers/user/userTranformer";
import { ReasonPhrases } from "@/application/constants/reason-phrases.constant";
import { GetAllUser } from "@/core/domain/use-cases/user/getAllUser";

export class UserController extends BaseController {
  constructor(private GetAllUser: GetAllUser) {
    super();
  }

  async index(context: Context) {
    try {
      const { page, perPage } = context.req.query();

      const result = await this.GetAllUser.excute({
        page: Number(page) || 1,
        perPage: Number(perPage) || 10,
      });

      if (!result.success) {
        return this.errorResponse(
          context,
          result.errorMessage ?? "Unknow",
          result.status
        );
      }

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
