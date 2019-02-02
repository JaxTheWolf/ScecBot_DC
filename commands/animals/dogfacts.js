const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
const https = require(`https`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class DogFactCommand extends Command {
  constructor(client) {
    super(client, {
      name: `dogfact`,
      aliases: [`dogfact`, `doggiefact`, `puppyfact`, `pupperfact`, `dawgfact`, `doggofact`, `dogefact`],
      group: `animals`,
      memberName: `dogfacts`,
      description: `Sends some random dog fact.`,
      examples: [`dogfact`]
    });
  }
  run(msg) {
    let requestURL = `https://some-random-api.ml/dogfact`;
    https
      .get(requestURL, function onDone(response) {
        let data = ``;
        response.on(`data`, chunk => {
          data += chunk;
        });
        response.on(`end`, () => {
          msg.say(JSON.parse(data).fact);
        });
      })
      .on(`error`, err => {
        msg.say(`An error has occured. (${err.message})`);
      });

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
