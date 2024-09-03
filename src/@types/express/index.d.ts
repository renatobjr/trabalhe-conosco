declare namespace Express {
  type ErrorInfo = {
    code?: number;
    details: string;
  };

  interface Response {
    success: (HttpStatusCode: number, data: T) => void;
    error: (HttpStatusCode: number, error: ErrorInfo) => void;
  }

  interface Request {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
}
