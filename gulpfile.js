import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import cleanCSS from 'gulp-clean-css';
import jsonminify from 'gulp-jsonminify';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import { deleteAsync } from 'del';

function clean() {
    return deleteAsync(['dist/**', '!dist']);
}

function minifyHTML() {
    return gulp.src('src/**/*.html')
        .pipe(newer('dist'))
        .pipe(htmlmin({ 
            collapseWhitespace: true,
            removeComments: true,
            conservativeCollapse: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true
        }))
        .pipe(gulp.dest('dist'));
}

function minifyJS() {
    return gulp.src('src/**/*.js')
        .pipe(terser({
            format: {
                comments: false
            },
            compress: {
                drop_console: true
            }
        }))
        .pipe(gulp.dest('dist'));
}

function minifyCSS() {
    return gulp.src('src/**/*.css')
        .pipe(cleanCSS({ 
            compatibility: 'ie8',
            level: {
                1: {
                    specialComments: 0
                }
            }
        }))
        .pipe(gulp.dest('dist'));
}

function minifyJSON() {
    return gulp.src('src/**/*.json')
        .pipe(jsonminify())
        .pipe(gulp.dest('dist'));
}

function copyStatic() {
    return gulp.src(['src/assets/**/*', 'src/images/**/*'], { base: 'src' })
        .pipe(newer('dist'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist'));
}

function watchFiles() {
    gulp.watch('src/**/*.html', minifyHTML);
    gulp.watch('src/**/*.js', minifyJS);
    gulp.watch('src/**/*.css', minifyCSS);
    gulp.watch('src/**/*.json', minifyJSON);
    gulp.watch(['src/assets/**/*', 'src/images/**/*'], copyStatic);
}

export default gulp.series(clean, minifyHTML, minifyJS, minifyCSS, minifyJSON, copyStatic);
export { watchFiles as watch };
