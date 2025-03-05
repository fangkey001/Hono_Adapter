import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

export class Meta<T extends Record<string, any> = {}> {
  total: number;
  page: number;
  per_page: number;
  extra?: Partial<T>;

  constructor(
    total: number,
    page: number,
    per_page: number,
    extra?: Partial<T>
  ) {
    this.total = total;
    this.page = page;
    this.per_page = per_page;
    this.extra = extra;
  }

  static fromPagination<T extends Record<string, any> = {}>(
    total: number,
    page: number,
    perPage: number,
    extra?: Partial<T>
  ): Meta<T> {
    return new Meta(total, page, perPage, extra);
  }
}

export class BaseController {
  successResponse<T, TMeta extends Record<string, any> = {}>(
    context: Context,
    data: T,
    message = "Success",
    status = 200,
    meta: Meta<TMeta> | null = null
  ) {
    if (typeof (data as any)?.toJSON === "function") {
      const jsonData = (data as any).toJSON();
      meta = jsonData.meta ? (jsonData.meta as Meta<TMeta>) : null;
      data = jsonData.data ? (jsonData.data as T) : data;
    }

    if ((data as any)?.data && (data as any)?.meta) {
      meta = (data as any).meta ? ((data as any).meta as Meta<TMeta>) : null;
      data = (data as any).data as T;
    }

    return context.json(
      {
        status: "success",
        status_code: status,
        message,
        data,
        meta,
      },
      status as ContentfulStatusCode
    );
  }

  errorResponse(context: Context, message: string, status = 400) {
    return context.json(
      { status: "error", message },
      status as ContentfulStatusCode
    );
  }
}
