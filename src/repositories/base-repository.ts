import { PrismaClient } from "@prisma/client";
import { prisma } from "@/configs/database";

export class BaseRepository<T> {
  constructor(private model: keyof Omit<PrismaClient, `$${string}`>) {}

  async paginate(
    page: number,
    perPage: number
  ): Promise<{ data: T[]; total: number }> {
    const modelInstance = prisma[this.model] as any;

    const total = await modelInstance.count();
    const data = await modelInstance.findMany({
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return { data, total };
  }
}
