const { watch, src, dest, series, parallel } = require("gulp");
const fsPromises = require('fs/promises');
const browserSync = require("browser-sync").create();
// const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const webpackStream = require("webpack-stream");
const htmlmin = require("gulp-htmlmin");
const extReplace = require("gulp-ext-replace");

const CONFIG = {
  src: {
    js: ["./src/js/**/*.js"],
    css: "./src/css/**/*.css",
    images: "./src/img/**/*.*",
    html: "./src/**/*.html",
    pngJpeg: "./src/img/*.{jpg,png}",
    favicon: "./src/favicon.ico"
  },
  docs: {
    base: "./docs/",
    images: "./docs/img/",
    favicon: "./docs/",
    js: "./docs/js"
  }
};

function cssTask(done) {
  src(CONFIG.src.css)
    .pipe(rename({ suffix: ".bundle" }))
    .pipe(dest(CONFIG.docs.base));
  done();
}
// commented becouse i need to see all files js(modules)
// function jsTask(done) {
//   src(CONFIG.src.js)
//     .pipe(
//       webpackStream({
//         output: {
//           filename: "main.js"
//         },
//         module: {
//           rules: [
//             {
//               test: /\.(js)$/,
//               exclude: /(node_modules)/,
//               loader: "babel-loader",
//               query: {
//                 presets: ["@babel/preset-env"]
//               }
//             }
//           ]
//         }
//       })
//     )
//     .pipe(rename({ suffix: ".bundle" }))
//     .pipe(uglify())
//     .pipe(dest(CONFIG.docs.base));

//   done();
// }

function jsTaskAllFilesSeparated(done) {
  src(CONFIG.src.js)
  .pipe(dest(CONFIG.docs.js));
  done();
}

function templateTask(done) {
  src(CONFIG.src.html)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(CONFIG.docs.base));
  done();
}

function imagesTask() {
  return fsPromises.cp('./src/img', './docs/img', { recursive: true, force: true });
}

function imagesTaskWebp() {
  return Promise.all([
    import('gulp-imagemin'),
    import('imagemin-webp')
  ]).then(([{ default: gulpImagemin }, { default: imageminWebp }]) => {
    return src(CONFIG.src.pngJpeg)
      .pipe(gulpImagemin([imageminWebp({ quality: 75 })]))
      .pipe(extReplace(".webp"))
      .pipe(dest(CONFIG.docs.images));
  });
}

function liveReload(done) {
  browserSync.init({
    server: {
      baseDir: CONFIG.docs.base
    }
  });
  done();
}

function reload(done) {
  browserSync.reload();
  done();
}

function cleanUp() {
  // Use dynamic import to load ESM-only 'del' from CommonJS gulpfile
  return import('del').then(({ deleteAsync }) => deleteAsync([CONFIG.docs.base]));
}

function favicon(done) {
  src(CONFIG.src.favicon).pipe(dest(CONFIG.docs.favicon));
  done();
}

function watchChanges() {
  watch(CONFIG.src.css, series(cssTask, reload));
  watch(CONFIG.src.html, series(templateTask, reload));
  // watch(CONFIG.src.js, series(jsTask, reload));
  watch(CONFIG.src.js, series(jsTaskAllFilesSeparated, reload));
  watch(CONFIG.src.images, series(imagesTask, reload));
  watch(CONFIG.src.favicon, series(favicon, reload));
}

exports.clean = cleanUp;
exports.dev = series(
  cleanUp,
  parallel(
    jsTaskAllFilesSeparated,
    cssTask,
    templateTask,
    imagesTask,
    favicon
  ),
  parallel(watchChanges, liveReload)
);
exports.build = series(
  cleanUp,
  parallel(
    // jsTask,
    jsTaskAllFilesSeparated,
     cssTask, imagesTask, imagesTaskWebp, templateTask, favicon)
);
