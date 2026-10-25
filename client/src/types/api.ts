export interface ApiError {
  response?: {
    data?: {
      success?: boolean;
      message?: string;
    };
    status?: number;
  };
  message: string;
  isAxiosError?: boolean;
}
