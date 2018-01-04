const commands = require('probot-commands')

module.exports = robot => {
  // Type `/ooo TBD` in a comment box for an Issue or Pull Request
  const keyword = 'ooo'
  const handler = (context, command) => {
    console.log(command)
  }
  const command = new commands.Command(keyword, handler)

  robot.on('issues.opened', command.listener.bind(command))
  commands(robot, keyword, handler)
}
