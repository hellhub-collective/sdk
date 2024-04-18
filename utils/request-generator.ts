import { request } from "utils/request";

import type {
  Entity,
  QueryObject,
  APIResponse,
  APIRequestInit,
} from "types/api-entities";

/**
 * Creates a request function for a given entity, which can be used to fetch
 * from a endpoint that does not support any query parameters.
 */
export function generatePrimitiveRequestFn<T extends Entity>(entity: string) {
  async function requestFn(
    input?: Omit<APIRequestInit<T[]>, "query">,
    options?: undefined,
  ): Promise<APIResponse<T[]>>;

  async function requestFn(
    input: number | string,
    options?: Omit<APIRequestInit<T[]>, "query">,
  ): Promise<APIResponse<T>>;

  async function requestFn(
    input: Omit<APIRequestInit<T[]>, "query"> | undefined | number | string,
    options?: APIRequestInit<T[]> | APIRequestInit<T>,
  ): Promise<APIResponse<T[]> | APIResponse<T>> {
    if (typeof input === "object" || input === undefined) {
      return request(entity, { ...input }) as Promise<APIResponse<T[]>>;
    } else {
      return request(`${entity}/${input}`, {
        ...(options as APIRequestInit<T>),
      }) as Promise<APIResponse<T>>;
    }
  }

  return requestFn;
}

/**
 * Creates a request function for a given entity, which can be used to fetch
 * data from the API.
 */
export function generateDynamicRequestFn<T extends Entity>(entity: string) {
  async function requestFn(
    input?: QueryObject<T> | undefined,
    options?: APIRequestInit<T[]>,
  ): Promise<APIResponse<T[]>>;

  async function requestFn(
    input: number | string,
    options?: APIRequestInit<T>,
  ): Promise<APIResponse<T>>;

  async function requestFn(
    input: QueryObject<T> | undefined | number | string,
    options?: APIRequestInit<T[]> | APIRequestInit<T>,
  ): Promise<APIResponse<T[]> | APIResponse<T>> {
    if (typeof input === "object" || input === undefined) {
      return request(entity, {
        ...options,
        ...(!!input ? { query: input } : ({} as any)),
      }) as Promise<APIResponse<T[]>>;
    } else {
      return request(`${entity}/${input}`, {
        ...(options as APIRequestInit<T>),
      }) as Promise<APIResponse<T>>;
    }
  }

  return requestFn;
}

/**
 * Creates a request function for a given entity, which can be used to fetch
 * a single entry from the API.
 */
export function generateSingleRequestFn<T extends Entity>(entity: string) {
  async function requestFn(
    options?: APIRequestInit<T>,
  ): Promise<APIResponse<T>> {
    return request(`${entity}`, {
      ...(options as APIRequestInit<T>),
    }) as Promise<APIResponse<T>>;
  }

  return requestFn;
}
