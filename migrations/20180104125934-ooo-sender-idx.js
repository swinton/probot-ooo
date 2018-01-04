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
  db.addIndex('out_of_office', 'sender_idx', ['sender'], callback);
};

exports.down = function(db, callback) {
  db.removeIndex('out_of_office', 'sender_idx', callback);
};

exports._meta = {
  "version": 1
};
