'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScoreSchema = new _mongoose2.default.Schema({
	user_id: { type: String },
	quality_rating: { type: Number },
	punctuality_rating: { type: Number },
	customer_support_rating: { type: Number },
	price_rating: { type: Number }

});

exports.default = _mongoose2.default.model('Scores', ScoreSchema);