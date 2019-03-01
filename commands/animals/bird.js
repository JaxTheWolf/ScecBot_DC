const log = require(`node-file-logger`)
const { basename } = require(`path`)
const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendImg } = require(`../../libs/jsonLibs`)
log.SetUserOptions(options)

module.exports = class BirdCommand extends Command {
  constructor (client) {
    super(client, {
      aliases: [`birb`, `birdie`],
      description: `Sends a random image of a bird`,
      examples: [`bird`],
      group: `animals`,
      memberName: `bird`,
      name: `bird`
    })
  }
  run (msg) {
    log.Info(`${basename(__filename, `.js`)} was used by ${msg.author.username}.`)

    return sendImg(msg, `https://some-random-api.ml/birbimg`, `link`)
  }
}
