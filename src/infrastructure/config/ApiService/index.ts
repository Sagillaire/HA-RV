import { AxiosInstance } from "axios";
import { clients } from "./apiService.config";


type TMethod = "get" | "post" | "put" | "patch" | "delete";

/**
 * @description Generic service class for API requests
 */
export class ApiService<T> {
  private client: AxiosInstance;
  private baseURL: string;

  constructor(service: string, client: keyof typeof clients) {
    this.baseURL = service;
    this.client = clients[client];
  }

  private async request<R>(method: TMethod, path = "", data?: unknown, params?: Record<string, unknown>): Promise<R> {
    try {
      const response = await this.client.request<R>({ method, url: `${this.baseURL}/${path}`, data, params });
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  get<T>(id: string | number): Promise<T> {
    return this.request<T>("get", String(id));
  }

  findAll<R = T[]>(path = "", params?: Record<string, unknown>): Promise<R> {
    return this.request<R>("get", path, undefined, params);
  }

  findByParams<R = T[]>(params?: Record<string, unknown>): Promise<R> {
    return this.request<R>("get", "", undefined, params);
  }

  create<R = T>(data: unknown, params?: Record<string, unknown>): Promise<R> {
    return this.request<R>("post", "", data, params);
  }

  createPath<R = T>(path: string, data: unknown, params?: Record<string, unknown>): Promise<R> {
    return this.request<R>("post", path, data, params);
  }

  update<R = T>(id: string | number, data: unknown, params?: Record<string, unknown>): Promise<R> {
    return this.request<R>("put", String(id), data, params);
  }

  patch<R = T>(id: string | number, data: unknown, params?: Record<string, unknown>): Promise<R> {
    return this.request<R>("patch", String(id), data, params);
  }

  updatePath<R = T>(path: string, data: unknown, params?: Record<string, unknown>): Promise<R> {
    return this.request<R>("put", path, data, params);
  }

  remove<R = T>(id: string | number): Promise<R> {
    return this.request<R>("delete", String(id));
  }
}
