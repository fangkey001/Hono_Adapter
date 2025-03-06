import { PrismaClient } from "@prisma/client";
import prisma from "./database/connection";

export class BaseRepository<T> {
  constructor(private model: keyof Omit<PrismaClient, `$${string}`>) {}

  async paginate(
    page: number,
    perPage: number
  ): Promise<{ data: T[]; total: number }> {
    try {
      const modelInstance = prisma[this.model] as any;

      const total = await modelInstance.count();
      const data = await modelInstance.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
      });

      return { data, total };
    } catch (error) {
      console.error(`Error in paginate:`, error);

      if (error instanceof Error) {
        throw new Error(
          JSON.stringify({
            name: error.name,
            message: error.message,
            stack: error.stack || "",
            errorCode: error.name || "DATABASE_ERROR",
          })
        );
      }

      throw new Error(
        JSON.stringify({
          name: "UnknownError",
          message: "An unexpected error occurred",
          errorCode: "UNKNOWN_ERROR",
        })
      );
    }
  }
}
