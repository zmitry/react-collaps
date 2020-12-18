const { build, serve } = require("esbuild");

const env = {
  "process.env.NODE_ENV": '"development"',
};

if (process.argv.includes("--develop")) {
  serve(
    {
      port: 3000,
      onRequest: console.log,
    },
    {
      entryPoints: ["./preview/index.html", "./preview/main.tsx"],
      minify: false,
      define: env,
      outdir: "./preview-build",
      bundle: true,
      target: "es2015",
      format: "esm",
      sourcemap: "inline",
      loader: {
        ".html": "file",
      },
    }
  ).then(console.log, console.error);
} else if (process.argv.includes("--preview")) {
  build({
    entryPoints: ["./preview/main.tsx"],
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
    define: {
      "process.env.NODE_ENV": '"development"',
    },
    outfile: "./build/index.js",
    bundle: true,
    external: ["react"],
    target: "es2017",
    format: "esm",
    sourcemap: "external",
  }).then(console.log, console.error);
}
