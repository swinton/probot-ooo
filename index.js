// Use UTC for for all Date parsing
process.env.TZ = 'UTC';

const commands = require('probot-commands')
const Sherlock = require('sherlockjs')

module.exports = robot => {
  // Type `/ooo TBD` in a comment box for an Issue or Pull Request
  const keyword = 'ooo'
  const handler = (context, command) => {
    let event = Sherlock.parse(command.arguments)
    console.log('startDate', event.startDate)
    console.log('endDate', event.endDate)
  }

  commands(robot, keyword, handler)

  // TODO
  // Get this to work for issues.opened as well
  // const command = new commands.Command(keyword, handler)
  // robot.on('issues.opened', command.listener.bind(command))
}
