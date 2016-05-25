'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _enterpriseprofiles = require('src/server/models/enterpriseprofiles');

var _enterpriseprofiles2 = _interopRequireDefault(_enterpriseprofiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RelationSchema = new _mongoose2.default.Schema({
	enterprise: { type: String, ref: 'Enterpriseprofiles' },
	client: { type: String, ref: 'Enterpriseprofiles' },
	relation_status: { type: String },
	createdAt: { type: Date, default: Date.now }

});

exports.default = _mongoose2.default.model('Relations', RelationSchema);