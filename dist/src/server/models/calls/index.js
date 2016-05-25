'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _enterpriseprofiles = require('src/server/models/enterpriseprofiles');

var _enterpriseprofiles2 = _interopRequireDefault(_enterpriseprofiles);

var _providerQuotations = require('src/server/models/providerQuotations');

var _providerQuotations2 = _interopRequireDefault(_providerQuotations);

var _userprofiles = require('src/server/models/userprofiles');

var _userprofiles2 = _interopRequireDefault(_userprofiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallsSchema = new _mongoose2.default.Schema({
	buyer_incharge: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' },
	// el status deberia mostrar opciones en lugar de aceptar numeros
	//status_call = abiarta o cerrada?
	status_code: Number,
	enterprise_id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Enterpriseprofiles' },
	status_call: { type: String, default: 'Abierta' },
	titleCall: String,
	opening: { type: Date, default: Date.now },
	opening_day: Number,
	opening_month: String,
	opening_year: Number,
	closing_date: Date,
	closing_date_viewFormat: String,
	deadline: Date,
	budget: Number,
	description_call: String,
	payment_detail: String,
	image_reference: String,
	//providers_quotation : [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProviderQuotation' }],
	providers_quotation: [{ type: _mongoose2.default.Schema.Types.ObjectId, ref: 'ProviderQuotation' }],
	questions: [{
		text: String,
		post_by: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' }

	}]

});

exports.default = _mongoose2.default.model('Calls', CallsSchema);