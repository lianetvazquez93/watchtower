const http = require("http");
const https = require("https");
const crypto = require("crypto");
const { minify } = require("html-minifier");

function md5(data) {
  return crypto
    .createHash("md5")
    .update(data, "binary")
    .digest("hex");
}

function openUrl(url) {
  return new Promise((resolve, reject) => {
    let client = http;

    if (url.toString().indexOf("https") === 0) {
      client = https;
    }

    client
      .get(url, resp => {
        let data = "";

        // A chunk of data has been recieved.
        resp.on("data", chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          resolve(data.toString());
        });
      })
      .on("error", err => {
        reject(err);
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
  const rawHtml = await openUrl(url);
  const minifiedHtml = minifyContent(rawHtml);
  const hashed = hash(minifiedHtml);
  return hashed;
}

module.exports = {
  pipeline,
};
