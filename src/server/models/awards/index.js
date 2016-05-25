import mongoose from 'mongoose'

let AwardSchema = new mongoose.Schema({
	image: { type: String },
	title_award: { type: String },
	subtitle: { type: String },
	external_url: { type: String}
})

export default mongoose.model('Awards', AwardSchema)