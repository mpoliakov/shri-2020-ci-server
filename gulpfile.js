"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync");
const del = require('del');

gulp.task("build:css", async () => {
  return gulp.src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"));
});

gulp.task("copy:img", async () => {
  return gulp.src("src/**/*.{svg,jpg,png}")
    .pipe(rename({dirname: ""}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy:html", async () => {
  return gulp.src("src/**/*.html")
    .pipe(rename({dirname: ""}))
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function(){
  return del("build");
});

gulp.task("build", gulp.series("clean", "copy:html", "copy:img", "build:css"));

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

  gulp.watch("src/**/*.html", gulp.series("copy:html", "refresh"));
  gulp.watch("src/**/*.{svg,jpg,png}", gulp.series("copy:img", "refresh"));
  gulp.watch("src/**/*.scss", gulp.series("build:css", "refresh"));
});

gulp.task("start", gulp.series("build", "server"));
