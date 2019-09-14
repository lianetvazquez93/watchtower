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
        const hash = await utils.pipeline(urlObj.url);
        if (urlObj.lastHash === hash) {
          break;
        }
        urlObj.lastHash = hash;
        const history = new History({
          loadingTime: 444,
          statusCode: 200,
          url: urlObj.url,
          expectator: expectator._id,
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
