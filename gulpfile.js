const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const browserSync = require('browser-sync').create()

gulp.task("server", function(cb) {
  let started = false

  nodemon({
    script: './bin/www',
    ext: 'js',
    watch: ['server/', 'app.js'],
    env: {
      'NODE_ENV': 'development'
    }
  }).on('start', function () {
    if (!started) {
      cb()
      started = true
    }
  })
})

gulp.task('browser-sync', ['server'], function() {
  var files = [
    'server/views/**/*.html',
    'server/views/**/*.hbs',
    'public/static/**/*.*'
  ]

  browserSync.init({
    files: files,
    proxy: 'http://localhost:3000',
    // browser: 'google chrome',
    // notify: false,
    // ui: false,
    port: 3001
  })

  gulp.watch(files).on('change', browserSync.reload)
})
