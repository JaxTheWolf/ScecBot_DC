const log = require(`node-file-logger`)
const { Command } = require(`discord.js-commando`)
const { options } = require(`../../configs/options`)
const { sendErrorEmbed, sendSuccessEmbed } = require(`../../libs/embeds`)
log.SetUserOptions(options)

module.exports = class KickCommand extends Command {
  constructor (client) {
    super(client, {
      name: `kick`,
      group: `mods`,
      memberName: `kick`,
      description: `Kick any members you wish`,
      userPermissions: [`KICK_MEMBERS`],
      clientPermissions: [`KICK_MEMBERS`],
      examples: [`kick @someUser#0000 Naughty words`],
      guildOnly: true,
      args: [
        {
          key: `member`,
          prompt: `Which member would you like to kick?`,
          type: `member`,
          error: `Invalid user mention. Please try again.`
        },
        {
          key: `reason`,
          prompt: `What should the reason be?`,
          default: `Kicked by SpecBot.`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { member, reason }) {
    return member.kick(reason)
      .then(m => {
        if (reason !== `Kicked by SpecBot.`) {
          log.Info(`Kicked member "${m.user.tag}" from guild "${msg.guild.name}". Reason: "${reason}"`)
        }
        return sendSuccessEmbed(msg, `👢  Member **${m.user.tag}** was kicked.`, `Reason: **${reason}**`)
      })
      .catch(err => {
        msg.delete().catch()
        return sendErrorEmbed(msg, `❌ Couldn't kick member **${member.user.tag}**`, `Reason: **${err.message}**`, 7500)
      })
  }
}
