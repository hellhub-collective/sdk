import "__mocks__/utils/request";

import {
  generateDynamicRequestFn,
  generatePrimitiveRequestFn,
  generateSingleRequestFn,
} from "utils/request-generator";

import { it, expect } from "bun:test";
import type { Cron, Planet } from "types/api-entities";

it("PrimitiveRequestFn works as expected", async () => {
  // @ts-expect-error
  const primitiveRequest = generatePrimitiveRequestFn<Cron>("/api/crons");

  const response1 = await primitiveRequest("refresh_from_source");
  const response2 = await primitiveRequest();

  expect(response1.ok).toBe(true);
  expect(response2.ok).toBe(true);

  expect(response1.url).toBe("/api/crons/refresh_from_source");
  expect(response2.url).toBe("/api/crons");

  const json1 = await response1.json();
  const json2 = await response2.json();

  expect(json1).toHaveProperty("data", null);
  expect(json1).toHaveProperty("error", null);

  expect(json2).toHaveProperty("data", null);
  expect(json2).toHaveProperty("error", null);
  expect(json2).toHaveProperty("pagination", null);
});

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
