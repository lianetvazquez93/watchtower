const db = require("../src/lib/db");
const Expectator = require("../src/models/expectator");
const History = require("../src/models/history");

const utils = require("../src/lib/utils");

(async function() {
  try {
    await db.connect();
    const expectators = await Expectator.find();
    for await (const expectator of expectators) {
      for await (const urlObj of expectator.urls) {
        const data = await utils.pipeline(urlObj.url);
        if (urlObj.lastHash === data.hash) {
          break;
        }
        urlObj.lastHash = data.hash;
        const history = new History({
          loadingTime: data.time,
          statusCode: data.statusCode,
          url: urlObj.url,
          expectator: expectator._id,
          httpVersion: data.httpVersion,
        });
        await history.save();
      }
      await expectator.save();
    }
    console.log("Done");
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
})();
