module.exports = (robot) => {

  robot.on('issues.opened', async context => {
    console.log('issue opened', context.payload)
  })

}
