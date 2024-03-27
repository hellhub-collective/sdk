import dts from "bun-plugin-dts";

await Bun.build({
  minify: true,
  outdir: "./dist",
  plugins: [dts()],
  entrypoints: ["./index.ts"],
  naming: { entry: "[name].mjs" },
});
