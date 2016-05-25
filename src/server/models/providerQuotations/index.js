import mongoose from 'mongoose'
// se guarda la informacion de las empresas participantes y su cotizacion
let ProviderQuotationSchema = new mongoose.Schema({
	in_charge: { type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' },
	//creo q aca deberia ir una referencia al enterprise igual que en el field in_charge
	enterprise_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Enterpriseprofiles' },
	call_reference : { type: mongoose.Schema.Types.ObjectId, ref: 'Calls' }, 
	answer_date : Date,
	answer_date_viewFormat : String,
	quantity : Number,
	item_name : String,
	item_description : String,
	attached : String,
	price : Number
});

export default mongoose.model('ProviderQuotation', ProviderQuotationSchema);
