const EventEmitter = require('events');
class Emitter extends EventEmitter {}

const StandardApplication = require('./components/standard-application');
const Component = require('./components/component');

const { Connection, Style, Class, Region, Tag, Template, Text, Connector } = require('./lib.js');

module.exports = { StandardApplication, Component, Emitter, Connection, Style, Class, Region, Tag, Template, Text, Connector };
