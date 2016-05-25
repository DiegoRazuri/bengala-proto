import mongoose from 'mongoose'

let CatalogSchema = new mongoose.Schema({
	image: { type: String},
	title_item: { type: String},
	subtitle: { type: String},
	description: { type: String}
})

export default mongoose.model('Catalogs', CatalogSchema)