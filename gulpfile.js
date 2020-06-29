// gulp 针对任务进行操作(流操作)  Task
// webpack 把一切都看做模块 module bundle
const gulp = require('gulp');
const connect = require('gulp-connect')//开启本地服务器
const watch = require('gulp-watch')//开启监听css,js,html文件
const htmlClaen = require("gulp-minify-html");//压缩HTML文件 
const jsminfiy = require('gulp-uglify');//js文件压缩
const cssminify = require('gulp-minify-css')//css文件压缩
const imgminify = require('gulp-imagemin')//图片压缩（支持图片格式为：jpg,png,gif,jpeg）
//const jsdebug = require('gulp-strip-debug')//去掉js中的调试语句
const less = require('gulp-less')//将less文件解析成css文件
const postCss = require('gulp-postcss');//c3属性增加前缀
const autoprefixer = require('autoprefixer')//配合这postcss一起使用
const fllie = {
  src: "src/",
  dist: "dist/"
}
const deMove = process.env.NODE_ENV == 'production';//修改模式在命令行输入export NODE_ENV=development或者production来设置环境变量
gulp.task('watchs', function () {
  gulp.watch(fllie.src + "html/*", gulp.series('html'));
  gulp.watch(fllie.src + "css/*", gulp.series('css'));
  gulp.watch(fllie.src + "js/*", gulp.series('js'));
})
gulp.task("connect", function () {
  connect.server({
    // root:fllie.dist,
    livereload: true//自动更新
  })
})
gulp.task("html", function () {
  const page = gulp.src(fllie.src + "html/*")//输入路径
  if(!deMove){//判断当前是否是开发模式//
    page.pipe(htmlClaen())
  }
  return page.pipe(gulp.dest(fllie.dist + "html/"))
    .pipe(connect.reload())
  //输出文件路径（gulp.dest(输出文件夹位置 )）
})
gulp.task("css", function () {
  const page = gulp.src(fllie.src + "css/*")//输入路径
    .pipe(less())//解析less文件
    .pipe(postCss([autoprefixer()]))
    if(!deMove){
      page.pipe(cssminify())
    }
    return page.pipe(gulp.dest(fllie.dist + "css/"))
    .pipe(connect.reload())

  //输出文件路径（gulp.dest(输出文件夹位置 )）
})
gulp.task("js", function () {
  const page = gulp.src(fllie.src + "js/*")
  .pipe(jsminfiy())//输入路径
  if(!deMove){
    //page.pipe(jsdebug())
  }
    return page.pipe(gulp.dest(fllie.dist + "js/"))
    .pipe(connect.reload())

  //输出文件路径（gulp.dest(输出文件夹位置 )）
})
gulp.task("img", function () {
 return gulp.src(fllie.src + "images/*")//输入路径
    .pipe(imgminify())
    .pipe(gulp.dest(fllie.dist + "images/"))//输出文件路径（gulp.dest(输出文件夹位置 )）
})
gulp.task("default", gulp.series(gulp.parallel('html', 'css', 'js', 'img', 'connect', 'watchs')));//多个依赖用gulp.parallel( 'html')

