// As described here:
// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#import

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('OutOfOffice', {
    sender: {
      type: DataTypes.STRING
    },
    owner: {
      type: DataTypes.STRING
    },
    repo: {
      type: DataTypes.STRING
    },
    issue: {
      type: DataTypes.INTEGER
    },
    commentId: {
      type: DataTypes.INTEGER,
      field: 'comment_id'
    },
    commentHtmlUrl: {
      type: DataTypes.STRING,
      field: 'comment_html_url'
    },
    message: {
      type: DataTypes.STRING
    },
    startDate: {
      type: DataTypes.DATE,
      field: 'start_date'
    },
    endDate: {
      type: DataTypes.DATE,
      field: 'end_date'
    }
  }, {
    freezeTableName: true,
    tableName: 'out_of_office',
    underscored: true
  })
}
