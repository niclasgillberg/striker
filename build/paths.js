var path = require("path");

var appRoot = "src/";
var outputRoot = "dist/";

module.exports = {
  root: appRoot,
  source: appRoot + "**/*.ts",
  html: appRoot + "**/*.html",
  css: "styles/**/*.scss",
  mainCss: "styles/application.scss",
  style: outputRoot + "styles/**/*.css",
  output: outputRoot,
  doc: "./doc",
  e2eSpecsSrc: "test/e2e/src/*.ts",
  e2eSpecsDist: "test/e2e/dist/",
  jspmDefs: "jspm_packages/github/**/*.d.ts",
  typingDefs: "typings/**/*.d.ts"
};
