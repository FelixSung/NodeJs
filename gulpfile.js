/**
 * Created by songfei on 15/6/18.
 */
var gulp = require('gulp');
var rename = require('gulp-rename');    //重命名
var uglify = require('gulp-uglify');    //压缩js
var minifyCss = require('gulp-minify-css');   //压缩css
var concat = require('gulp-concat');    //合并
var zip = require('gulp-zip');        //打包
var imagemin = require('gulp-imagemin'); //压缩图片
var jsHint = require('gulp-jshint');    //Js检测

//压缩js
gulp.task('Compress Javascrits',function(){
    gulp.src('./public/javascripts/core/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(gulp.dest('./build/javascripts/core/'))
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('./build/javascripts/core/'));
});
//压缩Css
gulp.task('Compress Stylesheets',function(){
    gulp.src('./public/stylesheets/*.css')
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build/stylesheets/'))
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('./build/stylesheets/'));
})
//压缩图片
gulp.task('Compress Images', function () {
    return true;  //图片压缩的modules获取失败
    //return gulp.src('./public/images/*')
    //    .pipe(imagemin({optimizationLevel:3,progressive:true}))
    //    .pipe(gulp.dest('./build/images/'));
});
//打包项目
gulp.task('Zip Project',['Compress Javascrits','Compress Stylesheets','Compress Images'],function(){
    return gulp.src(['**',
        '.gitignore',
        '!node_modules/**','!node_modules',
        '!public/images/**','!public/images',
        '!public/javascripts/**','!public/javascripts',
        '!public/stylesheets/**','!public/stylesheets',
        '!gulpfile.js'])
        .pipe(zip('project.zip'))
        .pipe(gulp.dest('dist'));
});
gulp.task('default',['Zip Project']);

//gulp.task('Check Js GR',function(){
//    gulp.src('./lib/dbHelper.js')
//        .pipe(jsHint())
//        .pipe(jsHint.reporter('default'))
//});