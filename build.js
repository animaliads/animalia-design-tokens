const StyleDictionary = require('style-dictionary');

const _ = require('lodash');
const fs = require('fs');

function generateTokens() {
  const StyleDictionary = require('style-dictionary');

  const _ = require('lodash');
  const fs = require('fs');

  StyleDictionary.registerFormat({
    name: 'css/variables',
    formatter: _.template(fs.readFileSync('templates/css.template'))
  });

  const packages = [
    { name: 'Global', path: './config.json' },
    { name: 'PO UI', path: './src/brands/po-ui/config.json' },
    { name: 'Fluig', path: './src/brands/fluig/config.json' },
  ];

  packages.forEach(brand => {
    const StyleDictionaryExtendedBrands = StyleDictionary.extend(brand.path);
    StyleDictionaryExtendedBrands.buildAllPlatforms();
  });
}

exports.generateTokens = generateTokens;
