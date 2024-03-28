import { it, expect } from "bun:test";

import buildQuery from "utils/query-generator";
import type { Planet } from "types/api-entities";

it("Query generator works as expected", () => {
  const query = buildQuery<Planet[]>({
    limit: 10,
    filters: { name: { $contains: "earth" } },
  });

  expect(query).toBe("limit=10&filters[name][contains]=earth");
});
