const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { basename } = require(`path`)
const { exec } = require(`shelljs`)
const { options } = require(`../../configs/options`)
log.SetUserOptions(options)

module.exports = class StatusCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Shows the status of the \`bot\` systemd service (Linux only, also systemd only)`,
      examples: [`status`],
      group: `owner`,
      memberName: `status`,
      name: `status`,
      ownerOnly: true
    })
  }
  run (msg) {
    if (process.platform !== `win32`) {
      exec(`systemctl status bot | tail -10`, { shell: `/bin/bash` }, function onDone (code, stdout) {
        return msg.say(`...\n${stdout}`, { code: `asciidoc` })
      })
    } else {
      return msg.say(`wip`)
    }

    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)
  }
}
