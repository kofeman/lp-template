var gulp = require('gulp'),
	jade = require('gulp-jade'),
	less = require('gulp-less'),
	csso = require('gulp-csso'),
	imagemin = require('gulp-imagemin'),
	imageminPngquant = require('imagemin-pngquant'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require("gulp-rename"),
	clean = require('gulp-clean'),
	prettify = require('gulp-html-prettify'),
	ghPages = require('gulp-gh-pages'),
	sprite = require("gulp.spritesmith"),
	browserSync = require("browser-sync"),
	zip = require('gulp-zip'),
	reload = browserSync.reload;

var config = {
	server: {
		baseDir: "./dist"
	},
	tunnel: true,
	host: 'localhost',
	port: 9000,
	logPrefix: "Frontend_Coder"
};

//Очищаем dist

gulp.task('clean', function () {
	return gulp.src('dist', {read: false})
		.pipe(clean());
});

// Собираем html из Jade

gulp.task('jade', function() {
	gulp.src(['app/layout/*.jade', '!app/layout/_*.jade'])
		.pipe(jade())
		.on('error', console.log)
		.pipe(prettify({indent_char: ' ', indent_size: 2}))
		.pipe(gulp.dest('dist'))
		.pipe(reload({stream: true}));
});


//less

gulp.task('less', function() {
	gulp.src(['app/less/style.less'])
		.pipe(less())
		.on('error', console.log)
		.pipe(autoprefixer())
		.pipe(gulp.dest('dist/css/'))
		.pipe(reload({stream: true}));

	gulp.src(['app/less/animate.css'])
		.pipe(csso())
		.pipe(gulp.dest('dist/css/'))
		.pipe(reload({stream: true}));

	gulp.src(['app/bower_components/**/*.css',
		'!app/bower_components/jquery/**/*.css',
		'!app/bower_components/bemto/**/*.css',
		'!app/bower_components/bootstrap-less/**/*.css',
		'!app/bower_components/jade-bootstrap/**/*.css',
		'!app/bower_components/html5shiv/**/*.css',
		'!app/bower_components/**/*theme.css'])
		.pipe(csso())
		.pipe(concat('plugins.css'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(reload({stream: true}));
});


// Собираем JS

gulp.task('js', function() {
	gulp.src([
		//'app/js/smooth-scroll.js',
		//'app/js/animations.js',
		'app/js/form.js'
	])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(reload({stream: true}));

	//gulp.src(
	//	['app/bower_components/**/*.min.js',
	//	'!app/bower_components/jquery/**/*.js',
	//	'!app/bower_components/bemto/**/*.js',
	//	'!app/bower_components/bootstrap-less/**/*.js',
	//	'!app/bower_components/jade-bootstrap/**/*.js',
	//	'!app/bower_components/html5shiv/**/*.js'])
	//	.pipe(concat('plugins.js'))
	//	.pipe(gulp.dest('./dist/js'))
	//	.pipe(reload({stream: true}));
});


// Копируем и минимизируем изображения + создаем спрайт

gulp.task('images', function() {
	var spriteData =
		gulp.src('./app/images/i/**/*') // путь, откуда берем картинки для спрайта
			.pipe(sprite({
				imgName: '../images/sprite.png',
				cssName: '_sprite.css',
				padding: 20,
				algorithm: 'top-down',
				cssOpts: {
					cssSelector: function (sprite) {
						return '.' + sprite.name;
					}
				}
			}));

	spriteData.img.pipe(gulp.dest('./app/images')); // путь, куда сохраняем картинку
	spriteData.css
		.pipe(gulp.dest('./app/less/helpers')); // путь, куда сохраняем стили

	gulp.src(['./app/less/helpers/_sprite.css'])
		.pipe(rename('_sprite.less'))
		.pipe(gulp.dest('./app/less/helpers'));

	gulp.src(['./app/images/**/*.jpg', '!./app/images/i/**/*', '!./app/images/i'])
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/images'));

	gulp.src('./app/images/*.png')
		.pipe(imageminPngquant({quality: '65-80', speed: 4})())
		.pipe(gulp.dest('dist/images'));
});

//bootstrap js

gulp.task('bootstrap-js', function () {
	gulp.src([
			'app/bower_components/bootstrap-less/js/transition.js',
			//'app/bower_components/bootstrap-less/js/alert.js',
			'app/bower_components/bootstrap-less/js/button.js',
			'app/bower_components/bootstrap-less/js/carousel.js',
			'app/bower_components/bootstrap-less/js/collapse.js',
			'app/bower_components/bootstrap-less/js/dropdown.js',
			'app/bower_components/bootstrap-less/js/modal.js',
			//'app/bower_components/bootstrap-less/js/tooltip.js',
			//'app/bower_components/bootstrap-less/js/popover.js',
			'app/bower_components/bootstrap-less/js/scrollspy.js',
			'app/bower_components/bootstrap-less/js/tab.js',
			'app/bower_components/bootstrap-less/js/affix.js']
	)
		.pipe(concat('bootstrap.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(reload({stream: true}));
});


//bootstrap css

gulp.task('bootstrap-css', function() {
	gulp.src('app/bower_components/bootstrap-less/less/bootstrap.less')
		.pipe(less())
		.pipe(gulp.dest('app/css'))
		.pipe(autoprefixer('last 3 versions'));
	gulp.src(
		'app/css/bootstrap.css'
	)
		.pipe(csso())
		.pipe(rename('bootstrap.min.css'))
		.pipe(gulp.dest('dist/css/'))
		.pipe(reload({stream: true}));
});

//bootstrap

gulp.task('bootstrap', ['bootstrap-js','bootstrap-css'], function() {});

//перемещаем файлы

gulp.task('transfer-files', function() {
	gulp.src('app/sendmessage.php')
		.pipe(gulp.dest('dist'));

	gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	gulp.src('app/bower_components/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('dist/js'));

	gulp.src('app/bower_components/html5shiv/dist/html5shiv.min.js')
		.pipe(gulp.dest('dist/js'));

});


//zip

gulp.task('zip', function() {
	return gulp.src(['dist/*','dist/*/**'])
		.pipe(zip('dist.zip'))
		.pipe(gulp.dest('./'));
});

gulp.task('zip-app', function() {
	return gulp.src([
		'!node_modules',
		'!*.zip',
		'!.idea',
		'!.DS_Store',
		'app/*',
		'app/*/**',
		'dist/*',
		'dist/*/**'])
		.pipe(zip('app.zip'))
		.pipe(gulp.dest('./'));
});

// Локальный сервер для разработки

gulp.task('webserver', function () {
	browserSync(config);
});


// Запуск сервера разработки gulp watch

gulp.task('watch', function() {

	gulp.watch('app/less/**/*.less', function() {
		gulp.run('less');
	});
	gulp.watch('app/layout/**/*.jade', function() {
		gulp.run('jade');
	});
	gulp.watch('app/js/**/*', function() {
		gulp.run('js');
	});
	//gulp.watch('app/images/**/*', function() {
	//	gulp.run('images');
	//});

});

//build task

gulp.task('build', [ 'jade', 'js', 'bootstrap','transfer-files', 'images', 'less'], function() {});

//work task

gulp.task('work', [ 'jade', 'js', 'less'], function() {});

//default task

gulp.task('default', [ 'work', 'webserver', 'watch'], function() {});

//deploy

gulp.task('deploy', function() {
	return gulp.src('./dist/**/*')
		.pipe(ghPages());
});

