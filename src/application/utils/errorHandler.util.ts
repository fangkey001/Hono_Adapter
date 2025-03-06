import { Result } from "@/core/domain/use-cases/baseUseCase";

export class ErrorHandler {
  static handle(error: unknown): {
    name: string;
    message: string;
    errorCode: string;
  } {
    let errorDetails: { name: string; message: string; errorCode: string } = {
      name: "UnknownError",
      message: "An unexpected error occurred",
      errorCode: "UNKNOWN_ERROR",
    };

    if (error instanceof Error) {
      try {
        const parsedError = JSON.parse(error.message) as {
          name: string;
          message: string;
          errorCode: string;
        };
        errorDetails = { ...parsedError };
      } catch {
        errorDetails = {
          name: error.name,
          message: error.message,
          errorCode: error.name || "DATABASE_ERROR",
        };
      }
    }

    return errorDetails;
  }

  static toResult<T>(errorDetails: {
    name: string;
    message: string;
    errorCode: string;
  }): Result<T> {
    return {
      success: false,
      errorCode: errorDetails.errorCode,
      message: errorDetails.message,
      requestId: "REQ-" + Date.now(),
      meta: null,
    };
  }
}
