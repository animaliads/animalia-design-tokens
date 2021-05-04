const StyleDictionary = require('style-dictionary');

const _ = require('lodash');
const fs = require('fs');

const generateTokens = () => {
  StyleDictionary.registerFormat({
    name: 'css/variables',
    formatter: _.template(fs.readFileSync('templates/css.template'))
  });

  const StyleDictionaryExtendedBrands = StyleDictionary.extend('./config.json');
  StyleDictionaryExtendedBrands.buildAllPlatforms();

}

exports.generateTokens = generateTokens;
