const { build, serve } = require("esbuild");

const env = {
  "process.env.NODE_ENV": `"${process.env.NODE_ENV || "development"}"`,
};



const onError = (e)=>{
  console.error(e);
  throw new Error(e);
}
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
  ).then(console.log, onError);
} else if (process.argv.includes("--preview")) {
  build({
    entryPoints: ["./preview/main.tsx"],
    minify: false,
    define: env,
    outfile: "./preview-build/index.js",
    bundle: true,
    target: "es2015",
    metafile: "./preview-build/meta.json",
    format: "esm",
    sourcemap: "inline",
  }).then(console.log,onError);
} else {
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
  }).then(console.log, onError);
}
