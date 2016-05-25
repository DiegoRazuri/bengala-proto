import mongoose from 'mongoose'
import Enterpriseprofiles from 'src/server/models/enterpriseprofiles'

let RelationSchema = new mongoose.Schema({
	enterprise: { type: String, ref: 'Enterpriseprofiles' },
	client: { type: String, ref: 'Enterpriseprofiles' },
	relation_status: {type: String},
	createdAt: {type: Date, default: Date.now}

})

export default mongoose.model('Relations', RelationSchema)