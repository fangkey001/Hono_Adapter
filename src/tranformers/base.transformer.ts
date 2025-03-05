interface TransformerContract<ModelType = any, TransformedResult = any> {
  transform(model: ModelType): TransformedResult | Promise<TransformedResult>;
}

export type TransformManagerOptions = {
  params?: any;
  options?: any;
};

type NewableTransformerClass<T = any, R = any> = new (
  options?: any
) => TransformerContract<T, R>;

export class TransformManager {
  public static async item<ModelType = any, TransformedResult = any>(
    model: ModelType,
    TransformerClass: NewableTransformerClass<ModelType, TransformedResult>,
    options?: TransformManagerOptions
  ) {
    const transformer = new TransformerClass(options?.options);
    return await transformer.transform(model);
  }

  public static async collection<ModelType = any, TransformedResult = any>(
    models: Array<ModelType>,
    TransformerClass: NewableTransformerClass<ModelType, TransformedResult>,
    options?: TransformManagerOptions
  ) {
    return await Promise.all(
      models.map((model) => this.item(model, TransformerClass, options))
    );
  }
}

export abstract class Transformer<T, R = any>
  implements TransformerContract<T, R>
{
  constructor(protected readonly options?: any) {}

  public abstract transform(model: T): R | Promise<R>;
}
