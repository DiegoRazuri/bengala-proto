import mongoose from 'mongoose'

let CertificationSchema = new mongoose.Schema({
	image: { type: String},
	archive: { type: String}
})

export default mongoose.model('Certifications', CertificationSchema)