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
        body: `:+1: Marked @${sender} as [OOO from ${moment(args.startDate).format("dddd, MMMM Do YYYY")} to ${moment(args.endDate).format("dddd, MMMM Do YYYY")}](${commentHtmlUrl}). :calendar:`
      }))
    })
  }

  // Handle OOO commands
  commands(robot, keyword, handler)

  // Handle mentions while OOO
  robot.on('issue_comment.created', context => {
      // Iterate over all unique @mentions
      const re = /@[A-Za-z0-9]+/g
      const mentions = context.payload.comment.body.match(re)
        .filter((mention, index, mentions) => mentions.indexOf(mention) === index)
        .map(mention => mention.substring(1))
      const now = new Date()

      mentions.forEach(mention => {
        robot.log.info('mention', mention)

        // Determine if mentioned user is OOO
        OutOfOffice.findOne({
          where: {
            sender: mention,
            owner: context.payload.repository.owner.login,
            startDate: {[Sequelize.Op.lte]: now},
            endDate: {[Sequelize.Op.gte]: now}
          },
          order: [
            // In case there are multiple, get the one created most recently
            ['created_at', 'DESC']
          ]
        })
        .then(ooo => {
          // Check to see if this OOO is still valid...
          // Does the original comment still exist?
          context.github.issues.getComment({
            owner: ooo.owner,
            repo: ooo.repo,
            id: ooo.commentId
          })
          .then(() => {
            // Respond on mentioned user's behalf if they are OOO
            robot.log.info(`${ooo.sender} is OOO until ${ooo.endDate}`)
            context.github.issues.createComment(context.issue({
              body: `:wave: Hey @${context.payload.comment.user.login}...\n\nLetting you know, \`@${ooo.sender}\` is [currently OOO until ${moment(ooo.endDate).format("dddd, MMMM Do YYYY")}](${ooo.commentHtmlUrl}). :heart:`
            }))
          })
        })
      })
  })

  // TODO
  // Get this to work for issues.opened as well
  // const command = new commands.Command(keyword, handler)
  // robot.on('issues.opened', command.listener.bind(command))
}
