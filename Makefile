run:
	deno run bin/cli.ts

fmt:
	deno fmt

test:
	deno test

build:
	cd bin; deno run  --allow-net --allow-read --allow-write --allow-env --allow-run build.ts
