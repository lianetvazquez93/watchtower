const crypto = require("crypto");
const { minify } = require("html-minifier");
const request = require("request");

function md5(data) {
  return crypto
    .createHash("md5")
    .update(data)
    .digest("hex");
}

function openUrl(url) {
  return new Promise((resolve, reject) => {
    request(url, { time: true }, (error, resp, body) => {
      if (error) {
        reject(error);
      }
      resolve({
        time: resp.elapsedTime,
        statusCode: resp.statusCode,
        httpVersion: resp.httpVersion,
        body,
      });
    });
  });
}

function minifyContent(html) {
  const output = minify(html, {
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
  });
  return output;
}

function hash(str) {
  const result = md5(str);
  return result;
}

async function pipeline(url) {
  const { time, statusCode, httpVersion, body } = await openUrl(url);
  const minifiedHtml = minifyContent(body);
  const hashed = hash(minifiedHtml);
  return {
    time,
    statusCode,
    httpVersion,
    hash: hashed,
  };
}

module.exports = {
  pipeline,
};
