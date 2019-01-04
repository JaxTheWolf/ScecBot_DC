const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class ReplyCommand extends Command {
  constructor(client) {
    super(client, {
      name: `reply`,
      group: `pc`,
      memberName: `reply`,
      description: `Replies with a Message.`,
      examples: [`reply`]
    });
  }
  run(msg) {
    return msg.say(`It's working!`);
    log.Info(
      `${path.basename(__filename, `.js`)} was used by ${msg.author.username}.`
    );
  }
};
