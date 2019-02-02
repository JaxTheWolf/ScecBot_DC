const { Command } = require(`discord.js-commando`);
const { options } = require(`../../options`);
const log = require(`node-file-logger`);
log.SetUserOptions(options);
let path = require(`path`);

module.exports = class UpdateCommand extends Command {
  constructor(client) {
    super(client, {
      name: `update`,
      group: `owner`,
      memberName: `update`,
      description: `Updates the bot using \`git pull ...\`.`,
      ownerOnly: true,
      examples: [`update`]
    });
  }
  run(msg) {
    let shell = require(`shelljs`);
    if (process.platform !== `win32`) {
      shell.exec(
        `cd scripts/ && sh update.sh`,
        { shell: `/bin/bash` },
        function onDone(code, stdout, stderr) {
          msg.say(stdout);
        }
      );
    } else {
      shell.exec(
        `cd scripts && .\\update.bat`,
        { shell: `C:\\Windows\\System32\\cmd.exe` },
        function onDone(code, stdout, stderr) {
          msg.say(stdout);
        }
      );
    }

    let toLog = `${path.basename(__filename, `.js`)} was used by ${
      msg.author.username
    }.`;

    console.log(toLog);
    log.Info(toLog);
  }
};
