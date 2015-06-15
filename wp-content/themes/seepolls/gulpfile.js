var gulp 			= require('gulp'),
// 	connect      	= require('gulp-connect'),
	uglify 			= require('gulp-uglify'),
	stylus 			= require('gulp-stylus'),
	livereload 		= require('gulp-livereload'),
	imagemin		= require('gulp-imagemin'),
	nib 			= require('nib'),
// 	rupture      	= require('rupture'),
	autoprefixer 	= require('gulp-autoprefixer');

// If there is an error in the styl or js file, it will prevent gulp to stop working, and show you in what line your error is
/*
function errorLog(error) {
	console.error.bind(error);
	this.emit('end');
}
*/

var path = {
	dest: {
		js: 'js/minjs',
		css: 'css/',
		img: 'images',
		font: 'dist/font/'
	},
	src: {
		js: 'js/*.js',
		stylus: 'css/*.styl',
		img: 'images/**/*.*',
		font: 'src/font/**/*.*',
		template: 'src/jade/template/*.jade',
		vendor: 'src/javascript/vendor/'
	}
}

// If there is an error in the styl or js file, it will prevent gulp to stop working, and show you in what line your error is.
function errorLog(err) {
	console.log(err.message);
	this.emit('end');
}

gulp.task('scripts', function(){
	gulp.src(path.src.js) // choose all js files
	.pipe(uglify({
		conditionals  : false
	})) // uglify js files
	.on('error', errorLog)
	.pipe(gulp.dest(path.dest.js)) // put them in to js/minjs directory
	.pipe(livereload());
});

// Styles Task
gulp.task('styles', function(){
	gulp.src(path.src.stylus)
	.pipe(stylus({
		use: [nib()/* , rupture() */],
		compress: false
	}))
	.on('error', errorLog)
	.pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(path.dest.css))
    .pipe(livereload());
});

// Image Task
gulp.task('image', function(){
	gulp.src(path.src.img)
	.pipe(imagemin({
		optimizationLevel: 7,
		progressive: true,
		interlaced: true
	}))
	.pipe(gulp.dest(path.dest.img));
}); 

// Watch Task
gulp.task('watch', function(){
	var server = livereload();
	gulp.watch(path.src.js, ['scripts']); // looks for a change of .js files in js folder and runs task 'scripts'
	gulp.watch(path.src.stylus, ['styles']);// looks for a change of .styl files in css/ folder and runs task 'styles'
});

gulp.task('default', ['scripts', 'styles', 'watch']);

