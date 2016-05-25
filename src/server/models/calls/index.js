import mongoose from 'mongoose'
import Enterpriseprofile from 'src/server/models/enterpriseprofiles'
import ProviderQuotationSchema from 'src/server/models/providerQuotations'
import Userprofiles from 'src/server/models/userprofiles'

let CallsSchema = new mongoose.Schema({
	buyer_incharge: { type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' },
	// el status deberia mostrar opciones en lugar de aceptar numeros
	//status_call = abiarta o cerrada?
	status_code : Number,
	enterprise_id :{ type: mongoose.Schema.Types.ObjectId, ref: 'Enterpriseprofiles' },
	status_call: { type: String, default : 'Abierta' },
	titleCall: String,
	opening : { type: Date, default: Date.now },
	opening_day : Number,
	opening_month : String,
	opening_year : Number,
	closing_date : Date,
	closing_date_viewFormat: String,
	deadline : Date,
	budget : Number,
	description_call : String,
	payment_detail: String,
	image_reference: String,
	//providers_quotation : [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProviderQuotation' }],
	providers_quotation : [{type: mongoose.Schema.Types.ObjectId, ref: 'ProviderQuotation'}],
	questions : [{
		text : String,
		post_by : { type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' }

	}]


})



export default mongoose.model('Calls', CallsSchema)