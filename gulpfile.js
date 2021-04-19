const { series, src, dest } = require('gulp');

const tap = require('gulp-tap');
const del = require('del');
const { generateTokens } = require('./build');

function clean (cb) {
  del.sync('./dist');
  cb();
}

function build(cb) {
  generateTokens();
  cb();
}

function copyPackageJson(cb) {
  const packages = [
    { name: '@animaliads/android-tokens', dest: './dist/global/android', desc: 'Tokens globais do PODS para Android' },
    { name: '@animaliads/css-tokens', dest: './dist/global/css', desc: 'Tokens globais do PODS em CSS' },
    { name: '@animaliads/ios-tokens', dest: './dist/global/ios', desc: 'Tokens globais do PODS para IOS' },
    { name: '@animaliads/ios-swift-tokens', dest: './dist/global/ios-swift', desc: 'Tokens globais do PODS para IOS Swift' },
    { name: '@animaliads/scss-tokens', dest: './dist/global/scss', desc: 'Tokens globais do PODS em SCSS' },
    { name: '@animaliads/fluig-tokens', dest: './dist/brands/fluig', desc: 'Tokens de brand do Fluig' },
    { name: '@animaliads/po-ui-tokens', dest: './dist/brands/po-ui', desc: 'Tokens de brand do PO UI' },
  ];

  packages.forEach(package => {
    src('package.json')
    .pipe(
      tap(file => {
        const contents = JSON.parse(file.contents.toString());

        delete contents.devDependencies;
        delete contents.scripts;

        contents.name = package.name;
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