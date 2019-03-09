const { Command } = require(`discord.js-commando`)
const { setMsg, disableMsg, showMsg } = require(`../../libs/welcomeLib`)

module.exports = class LeaveMsg extends Command {
  constructor (client) {
    super(client, {
      description: `Set the leave message`,
      examples: [`leavemsg set Hello, %s!`, `leavemsg delete`, `leavemsg`],
      group: `settings`,
      memberName: `leavemsg`,
      name: `leavemessage`,
      args: [
        {
          default: ``,
          error: `Invalid action. Reply with either set, show or disable.`,
          key: `action`,
          oneOf: [`set`, `show`, `disable`],
          prompt: `What action would you like to perform? (set, show, disable)`,
          type: `string`
        },
        {
          default: ``,
          key: `jMsg`,
          prompt: `What should the leave message be?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { action, jMsg }) {
    switch (action) {
    case `set`:
      return setMsg(msg, jMsg, `leave`)
    case `disable`:
      return disableMsg(msg, `leave`)
    default:
      return showMsg(msg, `leave`)
    }
  }
}