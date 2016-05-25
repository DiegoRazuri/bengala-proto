import mongoose from 'mongoose'
import Workplaces from 'src/server/models/workplaces'
import WorkingStations from 'src/server/models/workingStations'

let UserprofileSchema = new mongoose.Schema({
	username: { type: String, required: true},
	name: { type: String },
	lastname: { type: String, default: ' ' },
	photo: { type: String },
	position: { type: String},
	email: { type: String },
	phone_number: {type: Number},
	facebook_URL: {type: String},
	twitter_URL: {type: String},
	instagram_URL: {type: String},
	youtube_URL: {type: String},
	linkedin_URL: {type: String},
	provider: { type: String },
	workplaces: [Workplaces.schema],
	workingStations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WorkingStations' }],
	//Si durante el desarrollo esto no funciona, deberia definir esto arriba
	//_id : String,
	//y luego definir el tipo en contacts asi
	//{type: String, ref: Userpr...}
	contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles' }],
	createdAt: {type: Date, default: Date.now}

})

UserprofileSchema.index({
	username:'text',
	name: 'text',
	lastname:'text',
	position: 'text'
});

export default mongoose.model('Userprofiles', UserprofileSchema)