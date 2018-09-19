/**
 * ユーザ定義
 */
const $sassPath = 'wordpress/wp-content/themes/test/_sass';
const $sassFile = $sassPath + '/style.scss';
const $outputDir = 'wordpress/wp-content/themes/test';
const $soucemapDir = '_sass';

// sassコンパイル時のオプション were using node-sass.
const sassBuildOption = {
  Dev : {
    includePath: 'scss',
    outputStyle: 'expanded',
    indentType: 'tab',
    indentWidth: 1,
    sourceComments: true
  },
  Release : {
    includePath: 'scss',
    outputStyle: 'compressed',
  }
};

// オートプレフィクサのオプション
const autoprefixerOptions = {
  browsers: [
    '> 1%',
    "last 2 versions",
    "not ie < 11",
    "Android >= 4",
    "iOS >= 9",
    'Firefox ESR'
  ],
  cascade: false
};

/**
 * プラグインの読み込み
 * require('プラグイン名')
 */

// 本体 https://www.npmjs.com/package/gulp
const gulp = require('gulp');

// sassコンパイル https://www.npmjs.com/package/gulp-sass
const gulpSass = require('gulp-sass');

// ソースマップ用 https://www.npmjs.com/package/gulp-sourcemaps
const sourcemaps = require('gulp-sourcemaps');

// オートプレフィックス https://www.npmjs.com/package/gulp-autoprefixer
const autoprefixer = require('gulp-autoprefixer');

// グルッププラグインのエラーによるパイプの破損を防ぐ https://www.npmjs.com/package/gulp-plumber
const plumber = require('gulp-plumber');

// clean-cssを使用してCSSスタイルを縮小するGulpタスク。
const cleanss = require('gulp-cleancss');

// ファイルの相対パスを削除または置換する（gulp v3）。
const flatten = require('gulp-flatten');

/**
 * モジュール
 */
// ソースマップ付きのファイルを出力
function buildSassDev(sassOptions, autoprefixerOptions) {
  // sassファイルを取得 gulp.src('取得するファイル')
  return gulp.src($sassFile)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  // Sassのコンパイルを実行
  .pipe(gulpSass.sync(sassOptions)
    // Sassのコンパイルエラーを表示
    // (これがないと自動的に止まってしまう)
    .on('error', gulpSass.logError))
  .pipe(sourcemaps.write({includeContent: false}))
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(sourcemaps.write($soucemapDir))
  // 保存先
  .pipe(gulp.dest($outputDir));
}

// 圧縮ファイル出力
function buildSassRelease(sassOptions, autoprefixerOptions) {
  return gulp.src($sassFile)
    .pipe(plumber())
    .pipe(gulpSass.sync(sassOptions)
      .on('error', gulpSass.logError))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest($outputDir));
}

// 圧縮ファイル出力(マップ付き)
// https://qiita.com/takuyabe/items/e9f253f672d1df058cd0
// 別のプラグインで minify する。
function buildSassCompressed(sassOptions, autoprefixerOptions) {
  return gulp.src($sassFile)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(gulpSass.sync(sassOptions)
      .on('error', gulpSass.logError))
    .pipe(cleanss())
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(sourcemaps.write($soucemapDir))
    .pipe(flatten())
    .pipe(gulp.dest($outputDir));
}

/**
 * タスク本体
 * タスクを作成する
 * gulp.task('タスク名', 実行される処理)
 */
gulp.task('sass:d', function () {
  return buildSassDev(sassBuildOption.Dev, autoprefixerOptions);
});

// 変更監視、ソースマップ付き
gulp.task('sass:w', function () {
  gulp.watch($sassPath + '/**/*.s?ss', ['sass:d']);
});

// マップ付き圧縮
gulp.task('sass:c', function () {
  return buildSassCompressed(sassBuildOption.Release, autoprefixerOptions);
});

// マップなしリリース
gulp.task('sass:r', function () {
  return buildSassRelease(sassBuildOption.Release, autoprefixerOptions);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['sass:d']);
