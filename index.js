const {
  disableEveryone,
  owner,
  prefix,
  token,
  unknownCommandResponse
} = require(`./configs/conf.json`)
const fs = require(`fs`)
const log = require(`node-file-logger`)
const { open } = require(`sqlite`)
const sqlite3 = require(`sqlite3`)
const { CommandoClient, SQLiteProvider } = require(`discord.js-commando`)
const { join } = require(`path`)
const { options } = require(`./configs/options`)
log.SetUserOptions(options)

const client = new CommandoClient({
  commandPrefix: prefix,
  disableEveryone: disableEveryone,
  owner: owner,
  unknownCommandResponse: unknownCommandResponse
})

client.registry
  .registerDefaultTypes()
  .registerGroups([
    [`main`, `"Main" commands.`],
    [`settings`, `Guild specific settings`],
    [`pc`, `General stuff about computers.`],
    [`economy`, `Economy related commands.`],
    [`animals`, `All sorts of animal related commands.`],
    [`fun`, `Various fun commands.`],
    [`mods`, `Moderation related commands.`],
    [`owner`, `Owner-only commands.`],
    [`info`, `Informative commands.`]// ,
    // [`games`, `All kinds of smol games are here.`]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval_: true
  })
  .registerCommandsIn(join(__dirname, `commands`))

fs.readdir(`./events/`, (err, files) => {
  if (err) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith(`.js`)) return
    const event = require(`./events/${file}`)
    const eventName = file.split(`.`)[0]
    client.on(eventName, event.bind(null, client))
    delete require.cache[require.resolve(`./events/${file}`)]
  })
})

// Temp event handler in index.js. Doesn't work in ./events for some reason.
client.on(`commandRun`, (command, promise, message) => {
  log.Info(`${command.name} was used by ${message.author.tag}.`)
})

client.setProvider(
  open({ filename: join(`${__dirname}/DBs`, `settings.sqlite3`), driver: sqlite3.Database })
    .then(db => new SQLiteProvider(db)))
  .catch(console.error)

const cleanupFunc = async (code) => {
  await client.destroy()
  process.exit(code)
}

process.once(`SIGINT`, cleanupFunc)
process.once(`SIGTERM`, cleanupFunc)
process.once(`exit`, cleanupFunc)

client.login(token)
