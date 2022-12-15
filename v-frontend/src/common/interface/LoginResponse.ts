export interface LoginResponse {
  data?: {
    msg?: string;
    accessToken?: string;
  },
  status?: number;
}
