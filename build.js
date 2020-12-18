const { build } = require("esbuild");

build({
  entryPoints: ["./src/index.tsx"],
  minify: false,
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  outfile: "./build/index.js",
  bundle: true,
  external: ["react"],
  target: "es2017",
  format: "esm",
  sourcemap: "external",
}).then(console.log, console.error);
