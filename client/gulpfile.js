"use strict";

const gulp = require("gulp");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const server = require("browser-sync");
const del = require('del');

gulp.task("copy:img", async () => {
  return gulp.src("src/img/*.{svg,jpg,png}")
    .pipe(rename({dirname: ""}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp.src("src/img/icons/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("img", gulp.series("copy:img", "sprite"));

gulp.task("html", function(){
  return gulp.src("src/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("css", async () => {
  return gulp.src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"));
});

gulp.task("clean", function(){
  return del("build");
});

gulp.task("build", gulp.series("clean", "img", "html", "css"));

gulp.task("refresh", async (done) => {
  server.reload();
  done();
});

gulp.task("server", async () => {
  server.init({
    server: "./build",
    startPath: "/start-screen.html",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/**/*.html", gulp.series("html", "refresh"));
  gulp.watch("src/**/*.{svg,jpg,png}", gulp.series("img", "html", "refresh"));
  gulp.watch("src/**/*.scss", gulp.series("css", "refresh"));
});

gulp.task("start", gulp.series("build", "server"));
