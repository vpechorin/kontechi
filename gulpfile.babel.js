'use strict';

import gulp from 'gulp';
import gulpHelpers from 'gulp-helpers';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';

const taskMaker = gulpHelpers.taskMaker(gulp);
const situation = gulpHelpers.situation();
const _ = gulpHelpers.framework('_');
const runSequence = gulpHelpers.framework('run-sequence');

const path = {
  app: 'src/app.js',
  source: 'src/**/*.js',
  react: 'src/**/*.jsx',
  html: 'src/*.html',
  sass: ['src/**/*.scss'],
  output: 'dist/',
  index: 'src/index.html',
  indexHtmlOutput: 'dist/index.html',
  minify: 'dist/**/*.js',
  assets: ['./static/*'],
  watch: './src/**',
  systemConfig: './system.config.js'
};

let serverOptions = {
  open: false,
  ui: false,
  notify: false,
  ghostMode: false,
  port: process.env.PORT || 9000,
  server: {
    baseDir: [path.output],
    routes: {
      '/system.config.js': './system.config.js',
      '/jspm_packages': './jspm_packages'
    }
  }
};

if (situation.isProduction()) {
  serverOptions = _.merge(serverOptions, {
    codeSync: false,
    reloadOnRestart: false,
    server: {
      snippetOptions: {
        rule: {
          match: /qqqqqqqqqqq/
        }
      }
    }
  });
}

const cacheBustConfig = {
  usePrefix: false,
  patterns: [
    {
      match: '<!-- PROD',
      replacement: ''
    }, {
      match: 'END -->',
      replacement: ''
    }, {
      match: '{{hash}}',
      replacement: Math.round(new Date() / 1000)
    }
  ]
};

const babelCompilerOptions = {
  // modules: 'system'
  presets: ['env']
};

taskMaker.defineTask('clean', { taskName: 'clean', src: path.output });
// taskMaker.defineTask('babel', {
//   taskName: 'babel',
//   src: [path.source, path.react],
//   dest: path.output,
//   compilerOptions: babelCompilerOptions
// });

gulp.task('babel', () =>
  gulp.src(path.app)
    .pipe(babel(babelCompilerOptions))
    .pipe(gulp.dest(path.output))
);

taskMaker.defineTask('copy', { taskName: 'systemConfig', src: path.systemConfig, dest: path.output });
taskMaker.defineTask('copy', { taskName: 'assets', src: path.assets, dest: path.output });
taskMaker.defineTask('copy', { taskName: 'index.html', src: path.index, dest: path.output });

taskMaker.defineTask('htmlMinify', {
  taskName: 'htmlMinify-index.html',
  taskDeps: ['cache-bust-index.html'],
  src: path.indexHtmlOutput,
  dest: path.output
});

taskMaker.defineTask('watch', { taskName: 'watch', src: path.watch, tasks: ['compile', 'index.html', 'lint'] });
taskMaker.defineTask('minify', { taskName: 'minify', src: path.minify, dest: path.output });
taskMaker.defineTask('browserSync', { taskName: 'serve', config: serverOptions, historyApiFallback: true });

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => gulp.src(path.sass)
  .pipe(sourcemaps.init())
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(path.output)));
//  .pipe(browserSync.stream()));

gulp.task('compile', callback => runSequence(['sass', 'babel', 'assets'], callback));

gulp.task('recompile', callback => runSequence('clean', ['compile'], callback));

gulp.task('run', (callback) => {
  if (situation.isProduction()) {
    return runSequence('recompile', 'cache-bust-index.html', 'htmlMinify-index.html', 'minify', 'serve', callback);
  } else if (situation.isDevelopment()) {
    return runSequence('recompile', 'lint', 'index.html', 'serve', 'watch', callback);
  }
});

gulp.task('default', ['run']);
