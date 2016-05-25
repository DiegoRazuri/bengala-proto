'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userprofiles = require('src/server/models/userprofiles');

var _userprofiles2 = _interopRequireDefault(_userprofiles);

var _messages = require('src/server/models/messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WorkingStationsSchema = new _mongoose2.default.Schema({
	administrator: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' },
	participants: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	station_subject: String,
	station_title: String,
	room_id: String,
	typeOfChat: Number,
	messages: [_messages2.default.schema],
	createdAt: { type: Date, default: Date.now }
});

exports.default = _mongoose2.default.model('WorkingStations', WorkingStationsSchema);