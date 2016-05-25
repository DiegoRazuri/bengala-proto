import mongoose from 'mongoose'
import Enterpriseprofiles from 'src/server/models/enterpriseprofiles'

let WorkplaceSchema = new mongoose.Schema({
	enterprise: { type: mongoose.Schema.Types.ObjectId, ref: 'Enterpriseprofiles' },
	status: { type: Number}
})

export default mongoose.model('Workplaces', WorkplaceSchema)