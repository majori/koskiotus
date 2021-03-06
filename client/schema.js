var config      = require('../config');
var logger      = require('../logger');

var Promise     = require('bluebird');
var knex        = require('knex')(config.db);
var bookshelf   = require('bookshelf')(knex);

bookshelf.knex.schema.hasTable('guilds').then(function(exists) {
    if (!exists) {
        bookshelf.knex.schema.createTable('guilds', function(t) {
            t.increments('id').primary();
            t.integer('timestamp');
            t.string('name');
            t.integer('basket');
        })
        .then(() =>
            logger.info('Database: table "guilds" created.')
        );
    }
});

bookshelf.knex.schema.hasTable('depths').then(function(exists) {
    if (!exists) {
        bookshelf.knex.schema.createTable('depths', function(t) {
            t.increments('id').primary();
            t.timestamp('timestamp');
            t.integer('guild_id')
                .unsigned()
                .references('id')
                .inTable('guilds')
                .onDelete('SET NULL');
            t.integer('value').unsigned();
        })
        .then(() =>
            logger.info('Database: table "depths" created.')
        );
    }
});

bookshelf.knex.schema.hasTable('water_temperatures').then(function(exists) {
    if (!exists) {
        bookshelf.knex.schema.createTable('water_temperatures', function(t) {
            t.increments('id').primary();
            t.timestamp('timestamp');
            t.integer('guild_id')
                .unsigned()
                .references('id')
                .inTable('guilds')
                .onDelete('SET NULL');
            t.decimal('value', 1);
        })
        .then(() =>
            logger.info('Database: table "water_temperatures" created.')
        );
    }
});

bookshelf.knex.schema.hasTable('air_temperatures').then(function(exists) {
    if (!exists) {
        bookshelf.knex.schema.createTable('air_temperatures', function(t) {
            t.increments('id').primary();
            t.timestamp('timestamp');
            t.integer('guild_id')
                .unsigned()
                .references('id')
                .inTable('guilds')
                .onDelete('SET NULL');
            t.decimal('value', 1);
        })
        .then(() =>
            logger.info('Database: table "air_temperatures" created.')
        );
    }
});

bookshelf.knex.schema.hasTable('durations').then(function(exists) {
    if (!exists) {
        bookshelf.knex.schema.createTable('durations', function(t) {
            t.increments('id').primary();
            t.timestamp('timestamp');
            t.integer('guild_id')
                .unsigned()
                .references('id')
                .inTable('guilds')
                .onDelete('SET NULL');
            t.integer('value').unsigned();
        })
        .then(() =>
            logger.info('Database: table "durations" created.')
        );
    }
});

// Model definitions
var models = {};
models.Guild = bookshelf.Model.extend({
    tableName: 'guilds'
});
models.Depth = bookshelf.Model.extend({
    tableName: 'depths'
});
models.WaterTemp = bookshelf.Model.extend({
    tableName: 'water_temperatures'
});
models.AirTemp = bookshelf.Model.extend({
    tableName: 'air_temperatures'
});
models.Duration = bookshelf.Model.extend({
    tableName: 'durations'
});

// Collection definitions
var collections = {};
collections.Guilds = bookshelf.Collection.extend({
    model: models.Guild
});
collections.Depths = bookshelf.Collection.extend({
    model: models.Depth
});
collections.WaterTemps = bookshelf.Collection.extend({
    model: models.WaterTemp
});
collections.AirTemps = bookshelf.Collection.extend({
    model: models.AirTemp
});
collections.Durations = bookshelf.Collection.extend({
    model: models.Duration
});

module.exports = {
    bookshelf: bookshelf,
    models: models,
    collections: collections
};
