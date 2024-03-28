import { mock } from "bun:test";

import buildQuery from "utils/query-generator";
import type { APIRequestInit, Entity } from "types/api-entities";

mock.module("utils/request", () => ({
  request: async <T extends Entity = any>(
    _url: any,
    _options: APIRequestInit<T> = {},
  ) => {
    return {
      ok: true,
      url: `${_url}${
        _options.query && Object.keys(_options.query).length
          ? `?${buildQuery(_options.query)}`
          : ""
      }`,
      json: async () => ({ data: null, error: null, pagination: null }),
    };
  },
}));
