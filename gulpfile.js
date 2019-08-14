const gulp          = require("gulp");
const sass          = require("gulp-sass");
const sourcemaps    = require("gulp-sourcemaps");
const autoprefixer  = require("gulp-autoprefixer");
const rename        = require("gulp-rename");
const browserSync   = require("browser-sync").create();



const server = function(cb) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        notify: false,
        //port: 3000,
        open: true,
    });

    cb();
}

const css = function() {
    return gulp.src("src/scss/style.scss")
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle : "compressed"
            })
        )
        .pipe(autoprefixer())
        .pipe(rename({
            suffix: ".min",
            basename: "style"
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream({match: "**/*.css"}));
		
}

const watch = function() {
    gulp.watch("src/scss/**/*.scss", gulp.series(css));
    gulp.watch("dist/**/*.html").on("change", browserSync.reload);
}


exports.default = gulp.series(css, server, watch);
exports.css = css;
exports.watch = watch;