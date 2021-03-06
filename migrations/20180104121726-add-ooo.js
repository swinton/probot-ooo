'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('out_of_office', {
    columns: {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      sender: { type: 'string', notNull: true },
      owner: { type: 'string', notNull: true },
      repo: { type: 'string', notNull: true },
      issue: { type: 'int', notNull: true },
      comment_id: { type: 'int', notNull: true },
      comment_html_url: { type: 'string', notNull: true },
      start_date: { type: 'datetime', notNull: true},
      end_date: { type: 'datetime', notNull: true}
    },
    ifNotExists: true
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('out_of_office', { ifExists: true }, callback);
};

exports._meta = {
  "version": 1
};
