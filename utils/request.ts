import generateQuery from "utils/query-generator";
import type { APIRequestInit, APIResponse, Entity } from "types/api-entities";

export const API_URL =
  process?.env?.HELLHUB_API_URL ??
  "https://api-hellhub-collective.koyeb.app/api";

/**
 * Perform a network request to the API, provides the ability to pass a query
 * object and cache options.
 */
export async function request<T extends Entity | Array<Entity> = any>(
  endpoint: string,
  options: APIRequestInit<T> = {},
): Promise<APIResponse<T>> {
  const { query: _query, cache, ...fetchOptions } = options;

  // build the URL and append the query string if necessary
  if (endpoint.includes("api/") || endpoint.includes("/api/")) {
    endpoint = endpoint.replace("api/", "");
  }

  // build the URL and append the query string if necessary
  let url = `${API_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  if (!!_query && Object.keys(_query).length > 0) {
    url += `?${generateQuery(_query)}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...fetchOptions.headers,
    },
  });

  return response as APIResponse<T>;
}
