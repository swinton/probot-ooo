const Sequelize = require('sequelize');

module.exports = {
    OutOfOffice: sequelize => {
      return sequelize.define('out_of_office', {
        sender: {
          type: Sequelize.STRING
        },
        owner: {
          type: Sequelize.STRING
        },
        repo: {
          type: Sequelize.STRING
        },
        issue: {
          type: Sequelize.INTEGER
        },
        commentId: {
          type: Sequelize.INTEGER,
          field: 'comment_id'
        },
        commentHtmlUrl: {
          type: Sequelize.STRING,
          field: 'comment_html_url'
        },
        startDate: {
          type: Sequelize.DATE,
          field: 'start_date'
        },
        endDate: {
          type: Sequelize.DATE,
          field: 'end_date'
        }
      }, {modelName: 'OutOfOffice'})
    }
}
