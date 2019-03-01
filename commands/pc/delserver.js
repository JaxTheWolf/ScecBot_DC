const { Command } = require(`discord.js-commando`)
const { delConf } = require(`../../libs/pcLibs`)
const { options } = require(`../../configs/options`)
const log = require(`node-file-logger`)
log.SetUserOptions(options)
const { basename } = require(`path`)

module.exports = class ServerCommand extends Command {
  constructor (client) {
    super(client, {
      description: `Deletes your server`,
      examples: [`delserver yes`],
      group: `pc`,
      memberName: `delserver`,
      name: `delserver`,
      args: [
        {
          error: `Reply with yes/no.`,
          key: `confirm`,
          oneOf: [`yes`, `no`],
          prompt: `Do you want to proceed? (yes or no)`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { confirm }) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return delConf(msg, confirm, __dirname, `server`)
  }
}
