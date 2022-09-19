import * as esbuild from "https://deno.land/x/esbuild@v0.15.8/mod.js";

await esbuild.build({
  entryPoints: ["./web.ts"],
  outfile: "../docs/bundle.js",
  format: "esm",
  bundle: true,
});

esbuild.stop();
