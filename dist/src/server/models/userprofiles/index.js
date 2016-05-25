'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _workplaces = require('src/server/models/workplaces');

var _workplaces2 = _interopRequireDefault(_workplaces);

var _workingStations = require('src/server/models/workingStations');

var _workingStations2 = _interopRequireDefault(_workingStations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserprofileSchema = new _mongoose2.default.Schema({
	username: { type: String, required: true },
	name: { type: String },
	lastname: { type: String, default: ' ' },
	photo: { type: String },
	position: { type: String },
	email: { type: String },
	phone_number: { type: Number },
	facebook_URL: { type: String },
	twitter_URL: { type: String },
	instagram_URL: { type: String },
	youtube_URL: { type: String },
	linkedin_URL: { type: String },
	provider: { type: String },
	workplaces: [_workplaces2.default.schema],
	workingStations: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'WorkingStations' }],
	//Si durante el desarrollo esto no funciona, deberia definir esto arriba
	//_id : String,
	//y luego definir el tipo en contacts asi
	//{type: String, ref: Userpr...}
	contacts: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	createdAt: { type: Date, default: Date.now }

});

UserprofileSchema.index({
	username: 'text',
	name: 'text',
	lastname: 'text',
	position: 'text'
});

exports.default = _mongoose2.default.model('Userprofiles', UserprofileSchema);