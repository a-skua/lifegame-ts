run:
	deno run bin/cli.ts

fmt:
	deno fmt

test:
	deno test --coverage=coverage
	deno coverage coverage

build:
	cd bin; deno run  --allow-net --allow-read --allow-write --allow-env --allow-run build.ts
