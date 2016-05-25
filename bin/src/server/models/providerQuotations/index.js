'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// se guarda la informacion de las empresas participantes y su cotizacion
var ProviderQuotationSchema = new _mongoose2.default.Schema({
	in_charge: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Userprofiles' },
	//creo q aca deberia ir una referencia al enterprise igual que en el field in_charge
	enterprise_id: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Enterpriseprofiles' },
	call_reference: { type: _mongoose2.default.Schema.Types.ObjectId, ref: 'Calls' },
	answer_date: Date,
	answer_date_viewFormat: String,
	quantity: Number,
	item_name: String,
	item_description: String,
	attached: String,
	price: Number
});

exports.default = _mongoose2.default.model('ProviderQuotation', ProviderQuotationSchema);