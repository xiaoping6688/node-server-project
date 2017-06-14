const gulp = require('gulp')
const copy = require('gulp-copy')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const minifycss = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
const spriter = require('gulp-css-spriter')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const minifyhtml = require('gulp-minify-html')
const rev = require('gulp-rev')
const revcollector = require('gulp-rev-collector')
const eslint = require('gulp-eslint')
const sequence = require('gulp-sequence')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')

let paths = {
  jsComSrc: './src/js/common/*.js',
  jsAppSrc: './src/js/*.js',
  jsDest: '../public/static/js',
  cssSrc: './src/css/**/*',
  cssDest: '../public/static/css',
  imgSrc: './src/img/**/*',
  imgDest: '../public/static/img',
  htmlSrc: './src/html/**/*',
  htmlDest: '../public/static/html',
  libSrc: './src/libs/**/*',
  libDest: '../public/static',
  dist: '../public/static/**/*',
  // manifestFile: './rev-manifest.json'
}

gulp.task('scripts', ['scripts-common', 'scripts-app'])

gulp.task('scripts-common', function() {
  return gulp.src(paths.jsComSrc)
    .pipe(sourcemaps.init())
    .pipe(concat('common.min.js'))
    .pipe(uglify())
    // .pipe(rev()) // 文件名加MD5后缀
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.jsDest))
    // .pipe(rev.manifest()) // 生成一个rev-manifest.json
    // .pipe(gulp.dest('./')) // 将 rev-manifest.json 保存到 ./ 目录内
})

gulp.task('scripts-app', function() {
  return gulp.src(paths.jsAppSrc)
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    // .pipe(rev()) // 文件名加MD5后缀
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.jsDest))
    // .pipe(rev.manifest()) // 生成一个rev-manifest.json
    // .pipe(gulp.dest('./')) // 将 rev-manifest.json 保存到 ./ 目录内
})

// gulp.task('rev', ['scripts'], function() {
//   gulp.src(['./rev-manifest.json', '../server/views/index.hbs']) // 读取 rev-manifest.json 文件以及需要进行文件名替换的文件
//     .pipe(revcollector()) // 执行文件内文件名的替换
//     .pipe(gulp.dest('../server/views')) // 替换后的文件输出的目录
// })

gulp.task('images', function() {
  return gulp.src(paths.imgSrc)
    .pipe(imagemin({
      optimizationLevel: 5,
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.imgDest))
})

gulp.task('styles', function() {
  return gulp.src(paths.cssSrc)
    .pipe(sass()) // 编译scss
    .pipe(concat('app.min.css')) // 合并scss
    .pipe(autoprefixer()) // 浏览器厂商前缀 {browsers:["> 1%","Firefox >= 10","ie >= 9","iOS >= 4","Chrome >= 10"],cascade:false}
    // .pipe(spriter({
    //   // The path and file name of where we will save the sprite sheet
    //   'spriteSheet': paths.imgDest + '/spritesheet.png',
    //   // Because we don't know where you will end up saving the CSS file at this point in the pipe,
    //   // we need a litle help identifying where it will be.
    //   'pathToSpriteSheetFromCSS': '../img/spritesheet.png'
    // }))
    .pipe(minifycss()) // 压缩css
    .pipe(gulp.dest(paths.cssDest))
})

gulp.task('htmls', function() {
  gulp.src(paths.htmlSrc)
    .pipe(minifyhtml({ comments: false }))
    .pipe(gulp.dest(paths.htmlDest))
})

gulp.task('lint', function () {
  return gulp.src(['./src/js/**/*', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('clean', function(){
  del([paths.dist], { force: true })
})

gulp.task('libs', function() {
  gulp.src(paths.libSrc)
    .pipe(copy(paths.libDest, { prefix: 1 }))
    .pipe(gulp.dest(paths.libDest + '/libs'))
})

gulp.task('watch', function() {
  gulp.watch(paths.jsComSrc, ['scripts-common'])
  gulp.watch(paths.jsAppSrc, ['scripts-app'])
  gulp.watch(paths.cssSrc, ['styles'])
  gulp.watch(paths.imgSrc, ['images'])
  gulp.watch(paths.htmlSrc, ['htmls'])
  gulp.watch(paths.libSrc, ['libs'])
})

gulp.task('build', ['clean'], function (cb) {
  // gulp.start('scripts', 'styles', 'images', 'htmls', 'libs')
  sequence('scripts', 'styles', 'images', 'htmls', 'libs')(cb)
})

gulp.task('build-no-clean', function (cb) {
  gulp.start('scripts', 'styles', 'images', 'htmls', 'libs')
})

gulp.task('default', sequence('build', 'watch'))


// function SpriterGroup(pathArr) {
//   for (let i = 0; i < pathArr.length; i++) {
//     gulp.src(pathArr[i])
//       .pipe(spriter({
//         'spriteSheet' : paths.imgDest + '/spriteSheet_' + i +'.png',
//         'pathToSpriteSheetFormCss' : '../img/spriteSheet_' + i + '.png'
//       }))
//       .pipe(gulp.dest(paths.cssDest))
//   }
// }
