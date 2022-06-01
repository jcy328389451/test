//1.导入
const gulp=require('gulp');
const cssmin=require('gulp-cssmin');
const autoprefixer=require('gulp-autoprefixer');
const rename=require('gulp-rename');
//2.创建任务  完成打包
const sass=require('gulp-sass')(require('sass'));
const uglify=require('gulp-uglify');
const babel=require('gulp-babel');
const htmlmin=require('gulp-htmlmin')
const clean=require('gulp-clean')
const fs=require('fs');
const webserver=require('gulp-webserver')

gulp.task('css',function (){
  return  gulp.src('./src/css/*.css')
    .pipe(autoprefixer({
        overrideBrowserslist:['last 5 version','IOS > 3','Firefox > 2']
    }))
    .pipe(cssmin())
    .pipe(rename({
        suffix:'.min'
    }))
    .pipe(gulp.dest('./dist/css/'))//如果dist不存在  则会自动创建
})


/*
2.将sass文件先编译为css文件
gulp.src('./src/sass/**')

第三方依赖

gulp-sass
而且gulp-sass依赖于sass包
下载依赖包

npm i -D gulp-sass sass

3.自动添加前缀，打包，重命名（sass.**.min.css
5.将打包好的文件放到指定目录中
*/
gulp.task('sass',function(){
  return gulp.src('./src/sass/*')
  .pipe(sass())
  .pipe(autoprefixer({
    overrideBrowserslist:['last 5 version','IOS > 3','Firefox > 2']
  }))
  .pipe(cssmin())
  .pipe(rename({prefix:'sass.',suffix:'.min'}))
  .pipe(gulp.dest('./dist/css/'))
})



gulp.task('js',function(){
    return gulp
    .src('./src/js/*')
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('./dist/js/'))
  })
  
  gulp.task('es6',function(){
    return gulp
    .src('./src/js/*')
    .pipe(babel({presets:['es2015']}))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('./dist/js/'))
  })

  gulp.task('html',function(){
    return gulp
    .src('./src/page/*')
    .pipe(htmlmin({
        removeEmptyAttributes:true, // 移除空的属性
        collapseWhitespace:true, // 移除空格
        minifyCSS:true,   // 压缩 style 标签
        minifyJS:true,    // 压缩 script 标签 
   }))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('./dist/page/'))
  })

  gulp.task('lib',function(){
    return gulp
    .src('./src/lib/*')
    .pipe(gulp.dest('./dist/lib/'))
  })

  gulp.task('static',function(){
    return gulp
    .src('./src/static/*')
    .pipe(gulp.dest('./dist/static/'))
  })

  gulp.task('webserver',function(){
     return gulp.src('./dist')
      .pipe(webserver({
        host: '127.0.0.1',   // 配置打开浏览器的域名
        port: 8090,         // 配置打开浏览器的端口号
        livereload: true,    // 自动刷新浏览器
        open: './page/index.min.html'  // 默认打开 dist 文件夹下的哪个文件
      }))
  })

  gulp.task('watch',function(){
      gulp.watch('./src/css/**',gulp.series('css'))
      gulp.watch('./src/sass/**', gulp.series('sass'))
      gulp.watch('./src/js/**', gulp.series('js'))
      gulp.watch('./src/page/**',gulp.series('html'))
      gulp.watch('./src/lib/**', gulp.series('lib'))
      gulp.watch('./src/static/**', gulp.series('static'))
  })

  gulp.task('clean',function(cb){
      if(!fs.existsSync('./dist'))return cb();
      return gulp
      .src('./dist')
      .pipe(clean())
      
    })


    gulp.task('default',gulp.series('clean','css','sass','js','html','lib','static','webserver','watch'))
    //2.1创建一个css任务  进行css文件的打包
// console.log(fs.existsSync('./node_modules'));
// console.log(fs.existsSync('./dist'));
/*
1.找到打包的具体文件
gulp.src('./src/css/test.css')      需要打包的具体文件
gulp.src('./src/css/**');       找到打包目录中的所有文件

自动改名

1.2  css样式自动添加前缀
需要使用依赖包
gulp-autoprefixer
下载依赖包然后使用

2.进行打包压缩
进行css的打包压缩 ，需要使用第三方的包  gulp-cssmin
    npm i gulp-cssmin -D
    下载依赖包 导入并使用   cssmin() 
    gulp.pipe()  此方法中就是对我们之前找到的打包文件进行的操作

    gulp.pipe(cssmin())



3.将打包好的文件放到指定目录中  dist/css/

    gulp.dest(目录地址)   找到压缩后要存放压缩文件的目录地址

    gulp.pipe(gulp.dest(目录地址))  将压缩好的文件放到指定目录中






*/




























































































// const gulp=require('gulp')

// //创建任务
// gulp.task('a',function(){
//     console.log(666);

// })

// //创建任务t1---通过回调函数 结束任务
// gulp.task('t1',function(cb){
//     console.log('t1');
//     cb();//调用回调函数
// })


// //创建任务t3---通过任务流 结束任务
// gulp.task('t2',function(cb){
//    return gulp.src('./src/**');//src()方法是找到任务要打包的文件
// })

// //创建任务t3---通过任务流 结束任务
// gulp.task('t3',async function(cb){
//     await console.log("t3");
//  })



