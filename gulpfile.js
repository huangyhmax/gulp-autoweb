var gulp = require('gulp');

var cssnano =require('gulp-cssnano');
var concat =require('gulp-concat');
var imagemin=require('gulp-imagemin');
var autoprefixer=require('gulp-autoprefixer');
var clean= require('gulp-clean');
var uglify = require('gulp-uglify');


gulp.task("build:img",function(){
    gulp.src('./dist/img/*').pipe(clean());
    return gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
})


gulp.task("build:css",function(){
    gulp.src('./dist/css/*.css').pipe(clean());
    return gulp.src('./src/css/*.css')
        .pipe(concat('index-merge.css'))
        .pipe(cssnano())
        .pipe(autoprefixer({
            // browsers:['last 2 versions'],
            browsers: [
                'last 3 versions',
                'ie >= 10',
                'ie_mob >= 10',
                'ff >= 30',
                'chrome >= 34',
                'safari >= 6',
                'opera >= 12.1',
                'ios >= 6',
                'android >= 4.4',
                'bb >= 10',
                'and_uc 9.9',
            ],
            cascade:false
        }))
        .pipe(gulp.dest('./dist/css'))
})


gulp.task('build:js',function(){
    gulp.src('./dist/js/*.js').pipe(clean());
    return gulp.src('./src/js/*.js')
             .pipe(uglify())
             .pipe(concat('merge.js'))
             .pipe(gulp.dest('./dist/js'))
})
gulp.task('default',['build:css','build:js','build:img'])