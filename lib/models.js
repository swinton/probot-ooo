const Sequelize = require('sequelize');

module.exports = {
    OutOfOffice: sequelize => {
      return sequelize.define('OutOfOffice', {
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
        message: {
          type: Sequelize.STRING
        },
        startDate: {
          type: Sequelize.DATE,
          field: 'start_date'
        },
        endDate: {
          type: Sequelize.DATE,
          field: 'end_date'
        }
      }, {
        freezeTableName: true,
        tableName: 'out_of_office',
        underscored: true
      })
    }
}
