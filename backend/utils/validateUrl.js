const validUrl = require('valid-url');

function validateUrl(url) {
  return validUrl.isUri(url) && (url.startsWith('http://') || url.startsWith('https://'));
}

module.exports = validateUrl;