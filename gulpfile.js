var gulp = require('gulp');

var cssnano =require('gulp-cssnano');
var concat =require('gulp-concat');

gulp.task("build:css",function(){
    // gulp.src('./dist/css/*.css').pipe(clean());
    return gulp.src('./src/css/*.css')
        .pipe(concat('index-merge.css'))
        .pipe(cssnano())
        // .pipe(autoprefixer({
        //     // browsers:['last 2 versions'],
        //     browsers: [
        //         'last 3 versions',
        //         'ie >= 10',
        //         'ie_mob >= 10',
        //         'ff >= 30',
        //         'chrome >= 34',
        //         'safari >= 6',
        //         'opera >= 12.1',
        //         'ios >= 6',
        //         'android >= 4.4',
        //         'bb >= 10',
        //         'and_uc 9.9',
        //     ],
        //     cascade:false
        // }))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('default',['build:css'])