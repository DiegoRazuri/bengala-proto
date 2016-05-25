'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _enterpriseprofiles = require('src/server/models/enterpriseprofiles');

var _enterpriseprofiles2 = _interopRequireDefault(_enterpriseprofiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WorkplaceSchema = new _mongoose2.default.Schema({
	enterprise: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Enterpriseprofiles' },
	status: { type: Number }
});

exports.default = _mongoose2.default.model('Workplaces', WorkplaceSchema);