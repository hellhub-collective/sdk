import "__mocks__/utils/request";

import {
  generateDynamicRequestFn,
  generateSingleRequestFn,
} from "utils/request-generator";

import { it, expect } from "bun:test";
import type { Planet } from "types/api-entities";

it("SingleRequestFn works as expected", async () => {
  const singleRequest = generateSingleRequestFn<Planet>("https://example.com");

  const response = await singleRequest({
    query: {
      limit: 10,
      filters: { name: { $contains: "earth" } },
    },
  });

  expect(response.ok).toBe(true);

  expect(response.url).toBe(
    "https://example.com?limit=10&filters[name][contains]=earth",
  );

  const json = await response.json();
  expect(json).toHaveProperty("data", null);
  expect(json).toHaveProperty("error", null);
});

it("DynamicRequestFn works as expected", async () => {
  const dynamicRequest = generateDynamicRequestFn<Planet>(
    "https://example.com",
  );

  const response = await dynamicRequest({
    limit: 10,
    filters: { name: { $contains: "earth" } },
  });

  expect(response.ok).toBe(true);

  expect(response.url).toBe(
    "https://example.com?limit=10&filters[name][contains]=earth",
  );

  const json = await response.json();
  expect(json).toHaveProperty("data", null);
  expect(json).toHaveProperty("error", null);
  expect(json).toHaveProperty("pagination", null);
});
