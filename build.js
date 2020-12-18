const { build } = require("esbuild");

const env = {
  "process.env.NODE_ENV": '"development"',
};

if (process.argv.includes("--preview")) {
  build({
    entryPoints: ["./preview/index.tsx"],
    minify: false,
    define: env,
    outfile: "./preview-build/index.js",
    bundle: true,
    target: "es2015",
    format: "esm",
    sourcemap: "inline",
  }).then(console.log, console.error);
} else {
  build({
    entryPoints: ["./src/index.tsx"],
    minify: false,
    define: env,
    outfile: "./build/index.js",
    bundle: true,
    external: ["react"],
    target: "es2017",
    format: "esm",
    sourcemap: "external",
  }).then(console.log, console.error);
}
