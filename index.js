// Use UTC for for all Date parsing
process.env.TZ = 'UTC';

const commands = require('probot-commands')
const Sherlock = require('sherlockjs')
const moment = require('moment')

// Connect to database, define models
const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL)
const OutOfOffice = sequelize.import('./lib/models/ooo')

module.exports = robot => {
  // Type `/ooo from to until` in a comment box for an Issue or Pull Request
  const keyword = 'ooo'
  const handler = (context, command) => {
    let args = Sherlock.parse(command.arguments),
        sender = context.payload.sender.login,
        owner = context.payload.repository.owner.login,
        repo = context.payload.repository.name,
        issue = context.payload.issue.number,
        commentId = context.payload.comment.id,
        commentHtmlUrl = context.payload.comment.html_url

    // Preserve the following data
    robot.log.info('message', args.eventTitle)
    robot.log.info('startDate', args.startDate)
    robot.log.info('endDate', args.endDate)
    robot.log.info('sender', sender)
    robot.log.info('owner', owner)
    robot.log.info('repo', repo)
    robot.log.info('issue', issue)
    robot.log.info('commentId', commentId)
    robot.log.info('commentHtmlUrl', commentHtmlUrl)
    OutOfOffice.create({
      message: args.eventTitle,
      startDate: args.startDate,
      endDate: args.endDate,
      sender: sender,
      owner: owner,
      repo: repo,
      issue: issue,
      commentId: commentId,
      commentHtmlUrl: commentHtmlUrl
    })
    .then(() => {
      // Respond with confirmation
      context.github.issues.createComment(context.issue({
        body: `:+1: Marked @${sender} as [OOO from ${moment(args.startDate).format("dddd, MMMM Do YYYY")} to ${moment(args.endDate).format("dddd, MMMM Do YYYY")}](${commentHtmlUrl}) :calendar:.`
      }))
    })
  }

  commands(robot, keyword, handler)

  // TODO
  // Get this to work for issues.opened as well
  // const command = new commands.Command(keyword, handler)
  // robot.on('issues.opened', command.listener.bind(command))
}
