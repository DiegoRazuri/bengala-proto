import mongoose from 'mongoose'

let ScoreSchema = new mongoose.Schema({
	user_id: { type: String},
	quality_rating: {type: Number},
	punctuality_rating: {type: Number},
	customer_support_rating: {type: Number},
	price_rating: {type: Number}

})

export default mongoose.model('Scores', ScoreSchema)