import mongoose from 'mongoose'
import Userprofiles from 'src/server/models/userprofiles'

let MessageSchema = new mongoose.Schema({
	user : {type: mongoose.Schema.Types.ObjectId, ref: 'Userprofiles'},
	message : String,
//	isItNew : {type: Boolean, default: true},
	createdAt: {type: Date, default: Date.now}
})

export default mongoose.model('Messages', MessageSchema)