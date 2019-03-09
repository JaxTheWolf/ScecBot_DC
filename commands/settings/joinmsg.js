const { Command } = require(`discord.js-commando`)
const { setMsg, disableMsg, showMsg } = require(`../../libs/welcomeLib`)

module.exports = class JoinMsg extends Command {
  constructor (client) {
    super(client, {
      description: `Set the join message`,
      examples: [`joinmsg set Hello, %s!`, `joinmsg delete`, `joinmsg`],
      group: `settings`,
      memberName: `joinmsg`,
      name: `joinmessage`,
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
          prompt: `What should the join message be?`,
          type: `string`
        }
      ]
    })
  }
  run (msg, { action, jMsg }) {
    switch (action) {
    case `set`:
      return setMsg(msg, jMsg, `join`)
    case `disable`:
      return disableMsg(msg, `join`)
    default:
      return showMsg(msg, `join`)
    }
  }
}