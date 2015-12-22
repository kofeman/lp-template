var gulp = require('gulp'),
	jade = require('gulp-jade'),
	less = require('gulp-less'),
	csso = require('gulp-csso'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require("gulp-rename"),
	clean = require('gulp-clean'),
	prettify = require('gulp-html-prettify'),
	browserSync = require("browser-sync"),
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
	gulp.src('app/less/*.less')
		.pipe(less())
		.on('error', console.log)
		.pipe(autoprefixer())
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
	gulp.src(['app/js/**/*.js'])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(reload({stream: true}));

	gulp.src(['app/bower_components/**/*.min.js',
		'!app/bower_components/jquery/**/*.js',
		'!app/bower_components/bemto/**/*.js',
		'!app/bower_components/bootstrap-less/**/*.js',
		'!app/bower_components/jade-bootstrap/**/*.js',
		'!app/bower_components/html5shiv/**/*.js'])
		.pipe(concat('plugins.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(reload({stream: true}));
});




// Копируем и минимизируем изображения

gulp.task('images', function() {
	gulp.src('./app/images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/images'))

});



//bootstrap js

gulp.task('bootstrap-js', function () {
	gulp.src([
			'app/bower_components/bootstrap-less/js/transition.js',
			//'app/bower_components/bootstrap-less/js/alert.js',
			//'app/bower_components/bootstrap-less/js/button.js',
			'app/bower_components/bootstrap-less/js/carousel.js',
			//'app/bower_components/bootstrap-less/js/collapse.js',
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

	//gulp.src('app/fonts')
	//	.pipe(gulp.dest('dist'));

	gulp.src('app/bower_components/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('dist/js'));

	gulp.src('app/bower_components/html5shiv/dist/html5shiv.min.js')
		.pipe(gulp.dest('dist/js'));

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
	gulp.watch('app/images/**/*', function() {
		gulp.run('images');
	});

});

//build task

gulp.task('build', [ 'jade', 'less', 'js', 'bootstrap', 'images', 'transfer-files'], function() {});

//default task

gulp.task('default', [ 'build', 'webserver', 'watch'], function() {});

