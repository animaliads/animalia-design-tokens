const { series, src, dest } = require('gulp');

const tap = require('gulp-tap');
const del = require('del');
const { generateTokens } = require('./build');
const config = require('./config.json');

function clean(cb) {
  del.sync('./dist');
  cb();
}

function build(cb) {
  generateTokens();
  cb();
}

function copyPackageJson(cb) {
  const packages = [
    { 
      name: '@animaliads/android-tokens', 
      dest: './dist/android', 
      desc: 'Tokens globais do Animalia DS para Android',
      main: config.platforms.android.files[0].destination
    },
    { 
      name: '@animaliads/css-tokens', 
      dest: './dist/css', 
      desc: 'Tokens globais do Animalia DS em CSS',
      main: config.platforms.css.files[0].destination
    },
    { 
      name: '@animaliads/ios-tokens', 
      dest: './dist/ios', 
      desc: 'Tokens globais do Animalia DS para IOS',
      main: config.platforms.ios.files[0].destination
    },
    { 
      name: '@animaliads/ios-swift-tokens', 
      dest: './dist/ios-swift', 
      desc: 'Tokens globais do Animalia DS para IOS Swift',
      main: config.platforms['ios-swift'].files[0].destination
    },
    { 
      name: '@animaliads/scss-tokens', 
      dest: './dist/scss', 
      desc: 'Tokens globais do Animalia DS em SCSS',
      main: config.platforms.scss.files[0].destination
    },
  ];
  
  packages.forEach(package => {
    src('package.json')
    .pipe(
      tap(file => {
        const contents = JSON.parse(file.contents.toString());
        
        delete contents.devDependencies;
        delete contents.scripts;
        
        contents.name = package.name;
        contents.main = package.main;
        contents.description = package.desc;
        
        file.contents = Buffer.from(JSON.stringify(contents, null, 2), 'utf-8');
      })
      )
      .pipe(dest(package.dest));
    });
    
    cb();
    
  }
  
  exports.build = build;
  exports.default = series(clean, build, copyPackageJson);