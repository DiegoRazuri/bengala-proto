'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _userprofiles = require('src/server/models/userprofiles');

var _userprofiles2 = _interopRequireDefault(_userprofiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageSchema = new _mongoose2.default.Schema({
	user: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' },
	message: String,
	//	isItNew : {type: Boolean, default: true},
	createdAt: { type: Date, default: Date.now }
});

exports.default = _mongoose2.default.model('Messages', MessageSchema);