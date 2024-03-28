import "__mocks__/utils/request";

import HellHub from "index";
import { it } from "bun:test";

it("Main class correctly infers types", async () => {
  const response = await HellHub.planets(1);
  const { data: _ } = await response.json();
});
