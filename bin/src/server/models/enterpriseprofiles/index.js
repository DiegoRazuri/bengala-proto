'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _catalogs = require('src/server/models/catalogs');

var _catalogs2 = _interopRequireDefault(_catalogs);

var _userprofiles = require('src/server/models/userprofiles');

var _userprofiles2 = _interopRequireDefault(_userprofiles);

var _certifications = require('src/server/models/certifications');

var _certifications2 = _interopRequireDefault(_certifications);

var _awards = require('src/server/models/awards');

var _awards2 = _interopRequireDefault(_awards);

var _scores = require('src/server/models/scores');

var _scores2 = _interopRequireDefault(_scores);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EnterpriseprofileSchema = new _mongoose2.default.Schema({
	companyName: { type: String, required: true },
	descriptor: { type: String, default: " " },
	profileImage: { type: String, required: true },
	bannerImage: { type: String },
	businessName: { type: String, default: " " },
	industry: { type: String, default: " " },
	legalId: { type: String, required: true },
	phone: { type: String },
	email: { type: String },
	web: { type: String },
	address: { type: String },
	us: { type: String },
	offer: { type: String },
	searchKeywords: { type: String, default: " " },
	account_manager: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' },
	facebook_URL: { type: String },
	twitter_URL: { type: String },
	instagram_URL: { type: String },
	youtube_URL: { type: String },
	catalogs: [_catalogs2.default.schema],
	employees: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	certifications: [_certifications2.default.schema],
	awards: [_awards2.default.schema],
	scores: [_scores2.default.schema],
	provider: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Enterpriseprofiles' }],
	client: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Enterpriseprofiles' }],
	createdAt: { type: Date, default: Date.now }
	//recomendatios
});

EnterpriseprofileSchema.index({
	companyName: 'text',
	descriptor: 'text',
	businessName: 'text',
	industry: 'text',
	searchKeywords: 'text'
});

exports.default = _mongoose2.default.model('Enterpriseprofiles', EnterpriseprofileSchema);