import { BaseError } from "@/types/baseError.type";
import { Meta } from "@/controller/base.controller";

export type Result<T, TMeta = Meta> =
  | {
      success: true;
      data?: T;
      meta?: TMeta | null;
    }
  | {
      success: false;
      message: string;
      errorCode: string;
      errorMessage?: string;
      data?: T;
      status?: number;
      requestId?: string;
      meta?: TMeta | null;
    };

export abstract class UseCase<TPayload, T, TMeta = null> {
  public abstract excute(payload: TPayload): Promise<Result<T, TMeta>>;

  protected success<T>(result: { data: T; meta?: TMeta }): Result<T, TMeta> {
    return {
      success: true,
      data: result.data,
      meta: result.meta ?? null,
    };
  }

  protected error<T>({
    error,
    requestId,
    message,
  }: {
    error: BaseError;
    message?: string;
    requestId?: string;
  }): Result<T, TMeta> {
    return {
      success: false,
      message: message || error.message,
      errorCode: error.code,
      errorMessage: error.message,
      status: error.status,
      requestId,
      meta: null,
    };
  }
}
