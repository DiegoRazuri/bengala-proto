import mongoose from 'mongoose'
import Catalogs from 'src/server/models/catalogs'
import Userprofiles from 'src/server/models/userprofiles'
import Certifications from 'src/server/models/certifications'
import Awards from 'src/server/models/awards'
import Scores from 'src/server/models/scores'

let EnterpriseprofileSchema = new mongoose.Schema({
	companyName: { type: String, required: true},
	descriptor: { type: String, default: " " },
	profileImage: {type: String, required: true},
	bannerImage: {type: String},
	businessName: { type: String, default: " " },
	industry: { type: String, default: " " },
	legalId: { type: String, required: true },
	phone: { type: String },
	email: { type: String },
	web: { type: String },
	address: { type: String},
	us: { type: String },
	offer: { type: String },
	searchKeywords: { type: String, default: " "  },
	account_manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' },
	facebook_URL: { type: String },
	twitter_URL: {type: String},
	instagram_URL: {type: String},
	youtube_URL: {type: String},
	catalogs: [Catalogs.schema],
	employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	certifications: [Certifications.schema],
	awards: [Awards.schema],
	scores: [Scores.schema],
	provider: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enterpriseprofiles' }],
	client: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enterpriseprofiles' }],
	createdAt: {type: Date, default: Date.now}
	//recomendatios
})

EnterpriseprofileSchema.index({
	companyName:'text',
	descriptor: 'text',
	businessName:'text',
	industry: 'text',
	searchKeywords:'text'
});

export default mongoose.model('Enterpriseprofiles', EnterpriseprofileSchema)