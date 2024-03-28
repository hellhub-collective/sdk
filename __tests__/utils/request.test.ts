import "__mocks__/utils/request";

import { it, expect } from "bun:test";
import { request } from "utils/request";
import type { Planet } from "types/api-entities";

it("Request util works as expected", async () => {
  const response = await request<Planet[]>("https://example.com", {
    query: {
      limit: 10,
      filters: { name: { $contains: "earth" } },
    },
  });

  expect(response.ok).toBe(true);

  expect(response.url).toBe(
    "https://example.com?limit=10&filters[name][contains]=earth",
  );

  expect(await response.json()).toEqual({
    data: null,
    error: null,
    pagination: null as any,
  });
});
